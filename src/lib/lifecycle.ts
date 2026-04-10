/**
 * Submission Lifecycle — Canonical State Machine
 * ═══════════════════════════════════════════════
 * 
 * This file is the SINGLE SOURCE OF TRUTH for every valid `submission_status`
 * on the `witness_submissions` table and `final_status` on `gate_assessments`.
 * 
 * ALL writers (API routes, admin actions) MUST use these constants.
 * ALL readers (dashboards, queries) MUST reference this map.
 * 
 * ┌─────────────────┐
 * │ processing_sieve │  (initial insert — Tier 1 running)
 * └────────┬────────┘
 *          │
 *     ┌────▼────┐
 *     │ Tier 1  │
 *     └────┬────┘
 *          │
 *    pass? ├──── NO ──► rejected_sieve  ←── TERMINAL
 *          │
 *          YES
 *          │
 * ┌────────▼──────────────┐
 * │ processing_qualifier  │  (Tier 2 running)
 * └────────┬──────────────┘
 *          │
 *     ┌────▼────┐
 *     │ Tier 2  │
 *     └────┬────┘
 *          │
 *    pass? ├──── NO ──► rejected_qualifier  ←── TERMINAL
 *          │
 *          YES
 *          │
 * ┌────────▼──────────┐
 * │ awaiting_review    │  (HCC queue — Tier 3 pending)
 * └────────┬──────────┘
 *          │
 *     ┌────▼────┐
 *     │ Tier 3  │
 *     │  HCC    │
 *     └────┬────┘
 *          │
 *   accept?├──── NO ──► rejected_review  ←── TERMINAL
 *          │
 *          YES
 *          │
 * ┌────────▼──────────┐
 * │ accepted           │  ←── TERMINAL (witness proceeds to Instrument)
 * └───────────────────┘
 */

// ─── Submission Status (witness_submissions.submission_status) ───

export const SUBMISSION_STATUS = {
  /** Tier 1 AI Sieve is currently processing */
  PROCESSING_SIEVE: "processing_sieve",

  /** Tier 2 AI Qualifier is currently processing */
  PROCESSING_QUALIFIER: "processing_qualifier",

  /** Rejected by Tier 1 AI Sieve */
  REJECTED_SIEVE: "rejected_sieve",

  /** Rejected by Tier 2 AI Qualifier */
  REJECTED_QUALIFIER: "rejected_qualifier",

  /** Passed Tier 1 + 2, awaiting Human Curation Council (Tier 3) */
  AWAITING_REVIEW: "awaiting_review",

  /** Rejected by Tier 3 Human Review */
  REJECTED_REVIEW: "rejected_review",

  /** Passed all three tiers — witness may proceed to The Instrument */
  ACCEPTED: "accepted",
} as const;

export type SubmissionStatus = typeof SUBMISSION_STATUS[keyof typeof SUBMISSION_STATUS];

// ─── Gate Assessment Status (gate_assessments.final_status) ───

export const ASSESSMENT_STATUS = {
  /** AI tiers still processing or Tier 1 failed */
  PENDING: "pending",

  /** AI tiers complete, awaiting HCC review */
  REVIEW: "review",

  /** Passed all tiers (or rejected at any tier) */
  PASSED: "passed",
  FAILED: "failed",
} as const;

export type AssessmentStatus = typeof ASSESSMENT_STATUS[keyof typeof ASSESSMENT_STATUS];

// ─── Testimony Record Status (testimony_records.status) ───

export const TESTIMONY_STATUS = {
  /** Created after Gate pass, not yet reviewed by HCC */
  GATED: "gated",

  /** HCC is actively annotating */
  ANNOTATING: "annotating",

  /** HCC annotation complete */
  ANNOTATED: "annotated",

  /** Archived in the corpus */
  ARCHIVED: "archived",
} as const;

export type TestimonyStatus = typeof TESTIMONY_STATUS[keyof typeof TESTIMONY_STATUS];

// ─── Terminal states (no further transitions allowed) ───

export const TERMINAL_SUBMISSION_STATES: ReadonlySet<SubmissionStatus> = new Set([
  SUBMISSION_STATUS.REJECTED_SIEVE,
  SUBMISSION_STATUS.REJECTED_QUALIFIER,
  SUBMISSION_STATUS.REJECTED_REVIEW,
  SUBMISSION_STATUS.ACCEPTED,
]);

// ─── Display labels for the Witness Dashboard ───

export const SUBMISSION_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  [SUBMISSION_STATUS.PROCESSING_SIEVE]: { label: "Processing · Sieve", color: "text-amber-500/70" },
  [SUBMISSION_STATUS.PROCESSING_QUALIFIER]: { label: "Processing · Analysis", color: "text-amber-500/70" },
  [SUBMISSION_STATUS.REJECTED_SIEVE]: { label: "Rejected · Sieve", color: "text-red-500/70" },
  [SUBMISSION_STATUS.REJECTED_QUALIFIER]: { label: "Rejected · Analysis", color: "text-red-500/70" },
  [SUBMISSION_STATUS.AWAITING_REVIEW]: { label: "Awaiting HCC Review", color: "text-emerald-500/70" },
  [SUBMISSION_STATUS.REJECTED_REVIEW]: { label: "Rejected · HCC Review", color: "text-red-500/70" },
  [SUBMISSION_STATUS.ACCEPTED]: { label: "Accepted", color: "text-emerald-400/80" },
};
