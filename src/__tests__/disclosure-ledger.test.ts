import { describe, expect, it, vi } from "vitest";
import {
  listDisclosures,
  markRevoked,
  recordDisclosure,
} from "@/lib/witness-bridge/disclosure-ledger";

const sampleRow = {
  id: "ledger-1",
  entry_id: "twp_entry_synthetic_0001",
  publication_bundle_id: "synthetic-bundle-0001",
  redacted_public_slice_hash: "sha256:SYNTH-pub-0001",
  publication_bundle_hash: null,
  recipient_or_channel: "partner-a",
  disclosed_at: "2026-06-24T10:00:00Z",
  consent_version_ref: "synthetic-consent-v0",
  terms_ref: null,
  revocation_status: "active",
  revoked_at: null,
};

describe("recordDisclosure", () => {
  it("appends a row with revocation_status active and returns the mapped row", async () => {
    const single = vi.fn().mockResolvedValue({ data: sampleRow, error: null });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    const from = vi.fn().mockReturnValue({ insert });

    const row = await recordDisclosure({ from } as never, {
      entryId: "twp_entry_synthetic_0001",
      publicationBundleId: "synthetic-bundle-0001",
      redactedPublicSliceHash: "sha256:SYNTH-pub-0001",
      recipientOrChannel: "partner-a",
      consentVersionRef: "synthetic-consent-v0",
    });

    expect(from).toHaveBeenCalledWith("disclosure_ledger");
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        entry_id: "twp_entry_synthetic_0001",
        publication_bundle_id: "synthetic-bundle-0001",
        redacted_public_slice_hash: "sha256:SYNTH-pub-0001",
        recipient_or_channel: "partner-a",
        consent_version_ref: "synthetic-consent-v0",
        revocation_status: "active",
      })
    );
    // The caller never supplies an id; the DB generates it.
    expect(insert.mock.calls[0][0]).not.toHaveProperty("id");
    expect(row.id).toBe("ledger-1");
    expect(row.revocationStatus).toBe("active");
  });
});

describe("listDisclosures", () => {
  it("selects every row for an entry id", async () => {
    const eq = vi.fn().mockResolvedValue({ data: [sampleRow], error: null });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    const rows = await listDisclosures({ from } as never, "twp_entry_synthetic_0001");

    expect(from).toHaveBeenCalledWith("disclosure_ledger");
    expect(select).toHaveBeenCalledWith("*");
    expect(eq).toHaveBeenCalledWith("entry_id", "twp_entry_synthetic_0001");
    expect(rows).toHaveLength(1);
    expect(rows[0].entryId).toBe("twp_entry_synthetic_0001");
  });
});

describe("markRevoked", () => {
  it("updates revocation_status to revoked (and stamps revoked_at) without deleting", async () => {
    // The chain exposes only `update().eq(...)` — there is no `delete`, so a
    // deletion path would throw. markRevoked must only flip status.
    const entryEq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq: entryEq });
    const from = vi.fn().mockReturnValue({ update });

    await markRevoked({ from } as never, "twp_entry_synthetic_0001");

    expect(from).toHaveBeenCalledWith("disclosure_ledger");
    const payload = update.mock.calls[0][0];
    expect(payload).toHaveProperty("revocation_status", "revoked");
    expect(payload).toHaveProperty("revoked_at");
    expect(typeof payload.revoked_at).toBe("string");
    expect(entryEq).toHaveBeenCalledWith("entry_id", "twp_entry_synthetic_0001");
  });

  it("scopes the revocation to a single recipient when provided", async () => {
    const recipientEq = vi.fn().mockResolvedValue({ error: null });
    const entryEq = vi.fn().mockReturnValue({ eq: recipientEq });
    const update = vi.fn().mockReturnValue({ eq: entryEq });
    const from = vi.fn().mockReturnValue({ update });

    await markRevoked({ from } as never, "twp_entry_synthetic_0001", "partner-a");

    expect(entryEq).toHaveBeenCalledWith("entry_id", "twp_entry_synthetic_0001");
    expect(recipientEq).toHaveBeenCalledWith("recipient_or_channel", "partner-a");
  });
});
