import { describe, expect, it, vi } from "vitest";
import {
  OUTREACH_CHECKLIST_ITEMS,
  evaluateOutreachReadiness,
  recordReadinessDecision,
  type OutreachChecklistItem,
} from "@/lib/witness-bridge/outreach-readiness";

function allConfirmed(): Record<OutreachChecklistItem, boolean> {
  return Object.fromEntries(
    OUTREACH_CHECKLIST_ITEMS.map((item) => [item, true])
  ) as Record<OutreachChecklistItem, boolean>;
}

describe("evaluateOutreachReadiness", () => {
  it("is ready when every item passes, entry is real, and the hash is present", () => {
    const result = evaluateOutreachReadiness({
      items: allConfirmed(),
      entryKind: "real",
      redactedPublicSliceHashPresent: true,
    });
    expect(result.ready).toBe(true);
    expect(result.failedItems).toEqual([]);
  });

  it("withholds readiness and names the failed checklist item", () => {
    const items = allConfirmed();
    items.plurality_preserving = false;
    const result = evaluateOutreachReadiness({
      items,
      entryKind: "real",
      redactedPublicSliceHashPresent: true,
    });
    expect(result.ready).toBe(false);
    expect(result.failedItems).toContain("plurality_preserving");
  });

  it("Property 6: a synthetic entry can never be outreach-ready", () => {
    const result = evaluateOutreachReadiness({
      items: allConfirmed(),
      entryKind: "synthetic_exemplar",
      redactedPublicSliceHashPresent: true,
    });
    expect(result.ready).toBe(false);
    expect(result.failedItems).toContain("entry_kind_real");
  });

  it("Property 6: a missing public-slice hash blocks readiness", () => {
    const result = evaluateOutreachReadiness({
      items: allConfirmed(),
      entryKind: "real",
      redactedPublicSliceHashPresent: false,
    });
    expect(result.ready).toBe(false);
    expect(result.failedItems).toContain("redacted_public_slice_hash");
  });
});

describe("recordReadinessDecision", () => {
  function createSupabaseMock() {
    const eq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ update });
    return { client: { from } as unknown, from, update, eq };
  }

  it("records an accept decision with reviewer id and timestamp when ready", async () => {
    const mock = createSupabaseMock();
    await recordReadinessDecision(mock.client as never, {
      gateAssessmentId: "gate-1",
      reviewerId: "hcc-a",
      result: { ready: true, failedItems: [] },
    });

    expect(mock.from).toHaveBeenCalledWith("gate_assessments");
    const payload = mock.update.mock.calls[0][0];
    expect(payload.tier3_decision).toBe("accept");
    expect(payload.tier3_reviewer_a).toBe("hcc-a");
    expect(payload.tier3_notes).toBeNull();
    expect(typeof payload.tier3_completed_at).toBe("string");
    expect(mock.eq).toHaveBeenCalledWith("id", "gate-1");
  });

  it("records a withheld decision listing the failed items", async () => {
    const mock = createSupabaseMock();
    await recordReadinessDecision(mock.client as never, {
      gateAssessmentId: "gate-2",
      reviewerId: "hcc-a",
      result: { ready: false, failedItems: ["non_overclaiming", "revocable"] },
    });

    const payload = mock.update.mock.calls[0][0];
    expect(payload.tier3_decision).toBe("review");
    expect(payload.tier3_notes).toContain("non_overclaiming");
    expect(payload.tier3_notes).toContain("revocable");
  });
});
