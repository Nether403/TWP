import { describe, expect, it, vi } from "vitest";
import {
  assertEntryNotRevoked,
  isEntryRevoked,
  revokeEntry,
} from "@/lib/witness-bridge/revocation";

function row(overrides: Record<string, unknown> = {}) {
  return {
    id: "ledger-1",
    entry_id: "entry-1",
    publication_bundle_id: "bundle-1",
    redacted_public_slice_hash: "sha256:PUB-1",
    publication_bundle_hash: "sha256:BUNDLE-1",
    recipient_or_channel: "partner-a",
    disclosed_at: "2026-06-24T10:00:00Z",
    consent_version_ref: "consent-v1",
    terms_ref: null,
    revocation_status: "active",
    revoked_at: null,
    ...overrides,
  };
}

/** Supabase mock exposing both the select chain (list) and the update chain (revoke). */
function createSupabaseMock(rows: Record<string, unknown>[]) {
  const selectEq = vi.fn().mockResolvedValue({ data: rows, error: null });
  const select = vi.fn().mockReturnValue({ eq: selectEq });
  const updateEq = vi.fn().mockResolvedValue({ error: null });
  const update = vi.fn().mockReturnValue({ eq: updateEq });
  const from = vi.fn().mockReturnValue({ select, update });
  return { client: { from } as unknown, from, select, selectEq, update, updateEq };
}

describe("revokeEntry", () => {
  it("flips every exposure to revoked and signals the runtime", async () => {
    const mock = createSupabaseMock([row(), row({ id: "ledger-2", recipient_or_channel: "partner-b" })]);
    const signal = vi.fn().mockResolvedValue(undefined);

    const result = await revokeEntry(mock.client as never, "entry-1", signal);

    expect(mock.from).toHaveBeenCalledWith("disclosure_ledger");
    expect(mock.update.mock.calls[0][0]).toHaveProperty("revocation_status", "revoked");
    expect(mock.updateEq).toHaveBeenCalledWith("entry_id", "entry-1");
    expect(signal).toHaveBeenCalledWith("entry-1");
    expect(result.revokedExposures).toBe(2);
  });

  it("flips the ledger before signaling, so a signal failure still leaves it revoked", async () => {
    const mock = createSupabaseMock([row()]);
    const signal = vi.fn().mockRejectedValue(new Error("bridge down"));

    await expect(revokeEntry(mock.client as never, "entry-1", signal)).rejects.toThrow("bridge down");
    // Ledger was flipped before the (failing) signal.
    expect(mock.update).toHaveBeenCalled();
  });
});

describe("isEntryRevoked / assertEntryNotRevoked (re-export block)", () => {
  it("reports revoked and blocks re-export once any exposure is revoked", async () => {
    const mock = createSupabaseMock([row({ revocation_status: "revoked", revoked_at: "2026-06-25T00:00:00Z" })]);
    expect(await isEntryRevoked(mock.client as never, "entry-1")).toBe(true);
    await expect(assertEntryNotRevoked(mock.client as never, "entry-1")).rejects.toThrow(/revoked/);
  });

  it("allows export while every exposure is still active", async () => {
    const mock = createSupabaseMock([row()]);
    expect(await isEntryRevoked(mock.client as never, "entry-1")).toBe(false);
    await expect(assertEntryNotRevoked(mock.client as never, "entry-1")).resolves.toBeUndefined();
  });
});
