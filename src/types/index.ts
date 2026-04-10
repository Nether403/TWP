// ============================================================
// Shared TypeScript types for The Witness Protocol Foundation
// ============================================================

/** Witness status through the pipeline */
export type WitnessStatus = 'invited' | 'vetting' | 'active' | 'rejected' | 'exited';

/** Witness tier classification */
export type WitnessTier = 'A' | 'B' | 'C' | 'D';

/** Gate assessment status per tier */
export type TierStatus = 'pending' | 'passed' | 'failed';

/** Gate final decision */
export type GateDecision = 'pending' | 'passed' | 'failed' | 'review';

/** Testimony lifecycle status */
export type TestimonyStatus = 'gated' | 'annotating' | 'published' | 'archived';

/** Inquisitor session status */
export type InquisitorSessionStatus = 'active' | 'paused' | 'completed' | 'terminated';

/** Inquisitor turn role */
export type TurnRole = 'witness' | 'inquisitor' | 'system' | 'synthesis';

/** Failure log severity */
export type FailureSeverity = 'info' | 'warning' | 'critical';

/** Failure log category */
export type FailureCategory = 'prompt' | 'gate' | 'annotation' | 'security' | 'methodology' | 'other';

/** Expert outreach status */
export type ExpertStatus = 'identified' | 'contacted' | 'responded' | 'engaged' | 'declined';

/** Platform RBAC roles */
export type UserRole = 'witness' | 'hcc' | 'sac' | 'board' | 'researcher' | 'admin';

/** Annotation tag types */
export interface AnnotationTags {
  cap: string[];  // Capabilities guardrails
  rel: string[];  // Relational ethics
  felt: string[]; // Somatic/felt cues
}

/** Rubric scores for human review */
export interface RubricScores {
  depth: number;
  specificity: number;
  ethics: number;
  originality: number;
  coherence: number;
  cultural: number;
}

/** Audit log entry */
export interface AuditEntry {
  action: string;
  actor_id: string | null;
  target_type: string;
  target_id: string;
  metadata: Record<string, unknown>;
}
