import { z } from 'zod';

// ============================================================
// Intake Schemas
// ============================================================

/** Email summons registration */
export const summonsSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be 254 characters or fewer'),
});

/** Gate essay submission */
export const gateSubmissionSchema = z.object({
  essay_text: z
    .string()
    .min(1, 'Essay text is required')
    .refine(
      (text) => text.trim().split(/\s+/).length >= 250,
      'Essay must be at least 250 words'
    ),
});

// ============================================================
// Failure Log Schemas
// ============================================================

export const failureLogCategories = [
  'prompt',
  'gate',
  'annotation',
  'security',
  'methodology',
  'other',
] as const;

export const failureLogSeverities = ['info', 'warning', 'critical'] as const;

export const failureLogEntrySchema = z.object({
  category: z.enum(failureLogCategories),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  severity: z.enum(failureLogSeverities).default('info'),
  discovered_by: z.string().max(200).optional(),
  remedy: z.string().max(5000).optional(),
  is_public: z.boolean().default(false),
});

// ============================================================
// Expert Outreach Schemas 
// ============================================================

export const expertTiers = ['A', 'B', 'C', 'D'] as const;
export const expertDomains = [
  'ai_safety',
  'ethics',
  'global_south',
  'indigenous',
  'tech_leader',
] as const;

export const expertTargetSchema = z.object({
  name: z.string().min(1).max(200),
  tier: z.enum(expertTiers),
  email: z.string().email().optional(),
  institution: z.string().max(200).optional(),
  domain: z.enum(expertDomains),
  notes: z.string().max(5000).optional(),
});

// ============================================================
// Type exports
// ============================================================

export type SummonsInput = z.infer<typeof summonsSchema>;
export type GateSubmissionInput = z.infer<typeof gateSubmissionSchema>;
export type FailureLogEntryInput = z.infer<typeof failureLogEntrySchema>;
export type ExpertTargetInput = z.infer<typeof expertTargetSchema>;
