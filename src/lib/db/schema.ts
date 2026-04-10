import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  numeric,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';

// ============================================================
// Enums
// ============================================================

export const witnessTierEnum = pgEnum('witness_tier', ['A', 'B', 'C', 'D']);
export const witnessStatusEnum = pgEnum('witness_status', [
  'invited', 'vetting', 'active', 'rejected', 'exited',
]);
export const gateDecisionEnum = pgEnum('gate_decision', [
  'pending', 'passed', 'failed', 'review',
]);
export const tierStatusEnum = pgEnum('tier_status', [
  'pending', 'passed', 'failed',
]);
export const testimonyStatusEnum = pgEnum('testimony_status', [
  'gated', 'annotating', 'published', 'archived',
]);
export const sessionStatusEnum = pgEnum('session_status', [
  'active', 'paused', 'completed', 'terminated',
]);
export const turnRoleEnum = pgEnum('turn_role', [
  'witness', 'inquisitor', 'system', 'synthesis',
]);
export const failureCategoryEnum = pgEnum('failure_category', [
  'prompt', 'gate', 'annotation', 'security', 'methodology', 'other',
]);
export const failureSeverityEnum = pgEnum('failure_severity', [
  'info', 'warning', 'critical',
]);
export const expertStatusEnum = pgEnum('expert_status', [
  'identified', 'contacted', 'responded', 'engaged', 'declined',
]);
export const expertDomainEnum = pgEnum('expert_domain', [
  'ai_safety', 'ethics', 'global_south', 'indigenous', 'tech_leader',
]);

// ============================================================
// Phase 0 Tables (carried from V0.2)
// ============================================================

/** Email registrations for MHS Packet distribution */
export const summons = pgTable('summons', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

/** Raw essay submissions through The Gate (pre-vetting) */
export const witnessSubmissions = pgTable('witness_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  essayText: text('essay_text').notNull(),
  wordCount: integer('word_count').notNull(),
  submissionStatus: text('submission_status').default('pending_sieve'),
  
  // Evaluation Rubric (0-5 scale)
  scoreDepth: numeric('score_depth', { precision: 3, scale: 1 }),
  scoreSpecificity: numeric('score_specificity', { precision: 3, scale: 1 }),
  scoreEthics: numeric('score_ethics', { precision: 3, scale: 1 }),
  scoreOriginality: numeric('score_originality', { precision: 3, scale: 1 }),
  scoreCoherence: numeric('score_coherence', { precision: 3, scale: 1 }),
  scoreCultural: numeric('score_cultural', { precision: 3, scale: 1 }),
  totalScore: numeric('total_score', { precision: 4, scale: 2 }),
  reviewerNotes: text('reviewer_notes'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================
// Phase 0 Tables (new)
// ============================================================

/** Authenticated witness profiles */
export const witnessProfiles = pgTable('witness_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  supabaseUserId: uuid('supabase_user_id').unique().notNull(),
  pseudonym: text('pseudonym').unique().notNull(),
  displayName: text('display_name'),
  regionalCode: text('regional_code'),
  tier: witnessTierEnum('tier'),
  status: witnessStatusEnum('status').default('invited'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

/** Public, append-only transparency feed */
export const failureLogEntries = pgTable('failure_log_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: failureCategoryEnum('category').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  severity: failureSeverityEnum('severity').default('info'),
  discoveredBy: text('discovered_by'),
  remedy: text('remedy'),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

/** Expert outreach campaign tracking */
export const expertTargets = pgTable('expert_targets', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  tier: witnessTierEnum('tier').notNull(),
  email: text('email'),
  institution: text('institution'),
  domain: expertDomainEnum('domain'),
  status: expertStatusEnum('status').default('identified'),
  mhsSent: boolean('mhs_sent').default(false),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

/** Immutable, append-only audit log */
export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  action: text('action').notNull(),
  actorId: uuid('actor_id'),
  targetType: text('target_type'),
  targetId: uuid('target_id'),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
