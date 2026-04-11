# Threat Model & Security Posture

> Version 1.0 · April 2026 · Stichting The Witness Protocol Foundation

## 1. System Architecture boundary

The Witness Protocol Foundation operates entirely on Next.js 16 (App Router) deployed on Vercel, backed by a managed Supabase (PostgreSQL) instance. LLM inference is routed through OpenRouter to Anthropic models.

## 2. Threat Profiles

### A. Prompt Injection & Jailbreaking
- **Actor:** External witness submitting adversarial testimony.
- **Vector:** Crafted essay text designed to manipulate the Sieve, Qualifier, or Inquisitor LLMs into approving malicious content or leaking systemic prompts.
- **Mitigation:** 
  1. Strict system prompt isolation in `src/lib/ai/`.
  2. JSON-schema output parsing constraint for Tier 1 & 2.
  3. The Inquisitor prompt explicitly ignores meta-instructions embedded in witness input.
  4. Human review at Tier 3 acts as the ultimate firewall.

### B. PII Leakage to Sub-processors
- **Actor:** Unintentional exposure via sub-processor logging (Anthropic/OpenRouter).
- **Vector:** Witness includes highly sensitive PII in raw testimony which is transmitted to the LLM.
- **Mitigation:** Regex-based PII redaction executes *before* any API call to a sub-processor (`sieve.ts`, `qualifier.ts`). Hard-format identifiers are locally stripped first.

### C. Internal Data Exfiltration
- **Actor:** Compromised admin account or service role key.
- **Vector:** Unauthorized query to the `witness_submissions` vault containing raw, identified data.
- **Mitigation:** 
  1. Elimination of the shared `ADMIN_PASSPHRASE`.
  2. Implementation of Role-Based Access Control via Supabase Auth (`admin_roles`).
  3. Strict Row Level Security (RLS) on all tables; raw data is accessible only by the service role via protected Server Actions.
  4. Immutable `audit_log` tracking all admin reads and mutations.

### D. Session State Corruption
- **Actor:** Network instability or malicious concurrent requests.
- **Vector:** Interrupting the fire-and-forget `processCapture` during an active Inquisitor session, corrupting turn indices or losing synthesis states.
- **Mitigation:** Migrated to durable background capture using Next.js `after()` API to ensure the Vercel edge/serverless runtime completes state mutation before terminating.

### E. Supply Chain Attack
- **Actor:** Compromised npm package.
- **Vector:** Exploiting a vulnerability in a dependency (e.g., Next.js, Supabase JS client).
- **Mitigation:** GitHub Dependabot CI integration enforcing weekly security patched updates.

## 3. Deployment Posture
- Environment variables are securely managed in Vercel.
- Database access uses connection pooling via Supavisor.
- Error monitoring is routed via Sentry, with query-param scrubbing to prevent accidental PII logging in stack traces.
