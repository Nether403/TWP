import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Task 9 — the HCC reviewer checklist gate (TWP control plane).
 *
 * One verifiable checklist item per acceptance condition (R1–R10). An entry may
 * be marked outreach-ready ONLY when every item passes AND the public-slice hash
 * is present AND entry_kind is `real` (design Property 6 / R10, R11, R12).
 *
 * The reviewer decision is recorded into the Tier 3 gate-assessment record; the
 * actual flip of the entry's meta.outreach_ready is a G_5.2 concern applied over
 * the bridge (end-to-end task 11), not here.
 */

/** One checklist item per acceptance condition R1–R10. */
export const OUTREACH_CHECKLIST_ITEMS = [
  'consent_bounded', // R1
  'provenance_tracked', // R2
  'human_readable', // R3
  'machine_structured', // R4
  'plurality_preserving', // R5
  'model_relevant', // R6
  'non_overclaiming', // R7
  'revocable', // R8
  'witness_attributed_eval', // R9
  'outreach_packageable', // R10
] as const;

export type OutreachChecklistItem = (typeof OUTREACH_CHECKLIST_ITEMS)[number];

export interface OutreachReadinessInput {
  /** Reviewer confirmation per acceptance condition. */
  items: Record<OutreachChecklistItem, boolean>;
  entryKind: 'real' | 'synthetic_exemplar';
  redactedPublicSliceHashPresent: boolean;
}

export interface OutreachReadinessResult {
  ready: boolean;
  failedItems: string[];
}

/**
 * Evaluate outreach readiness. Returns the gating decision and the list of
 * everything that blocked it (unconfirmed checklist items plus the structural
 * gates). `ready` is true only when `failedItems` is empty (Property 6).
 */
export function evaluateOutreachReadiness(
  input: OutreachReadinessInput
): OutreachReadinessResult {
  const failedItems: string[] = [];

  for (const item of OUTREACH_CHECKLIST_ITEMS) {
    if (!input.items[item]) {
      failedItems.push(item);
    }
  }

  // Structural gates beyond reviewer confirmation.
  if (input.entryKind !== 'real') {
    failedItems.push('entry_kind_real');
  }
  if (!input.redactedPublicSliceHashPresent) {
    failedItems.push('redacted_public_slice_hash');
  }

  return { ready: failedItems.length === 0, failedItems };
}

export interface RecordReadinessDecisionInput {
  gateAssessmentId: string;
  reviewerId: string;
  result: OutreachReadinessResult;
}

/**
 * Record the reviewer's outreach-readiness determination into the Tier 3 gate
 * record: reviewer id, decision, completion timestamp, and — when withheld —
 * the list of failed items.
 */
export async function recordReadinessDecision(
  supabaseAdmin: SupabaseClient,
  input: RecordReadinessDecisionInput
): Promise<void> {
  const { ready, failedItems } = input.result;

  const { error } = await supabaseAdmin
    .from('gate_assessments')
    .update({
      tier3_reviewer_a: input.reviewerId,
      tier3_decision: ready ? 'accept' : 'review',
      tier3_notes: ready
        ? null
        : `Outreach readiness withheld; failed: ${failedItems.join(', ')}`,
      tier3_completed_at: new Date().toISOString(),
    })
    .eq('id', input.gateAssessmentId);

  if (error) {
    throw error;
  }
}
