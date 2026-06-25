# Changelog — The Witness Protocol Foundation Platform

All notable changes to this project will be documented in this file.

---

## [Unreleased] — Witness bridge, lifecycle, disclosure ledger, corpus-entry control plane

### Added
- **M1 Witness bridge**: authenticated bridge client to the G_5.2 governed runtime (`src/lib/witness-bridge/`), shared-secret headers, fail-closed config. Bridge auth is enforced on the G_5.2 side (see `docs/m1-witness-bridge-contract.md`).
- **M2 accepted-witness lifecycle**: `witness_runtime_links` linkage state, lifecycle/revoke/bridge-error classification (`lifecycle.ts`, `link-state.ts`), proven in `docs/m2-witness-revoke-proof.md`.
- **Disclosure ledger** (`disclosure_ledger` table + `src/lib/witness-bridge/disclosure-ledger.ts`): append-only record of every public/partner exposure; the authoritative registry for revocation.
- **Outreach-readiness HCC gate** (`outreach-readiness.ts`): R1–R10 checklist + structural gates (public-slice hash present, `entry_kind === real`).
- **Revocation coordinator** (`revocation.ts`): flips ledger exposures to revoked (never deletes), blocks re-export, signals the runtime.

### Changed
- **Tables (14)**: added `gate_assessments`, `testimony_records`, `inquisitor_*`, `synthesis_entries`, `admin_roles`, `consent_records`, `witness_runtime_links`, `disclosure_ledger` beyond the Phase 0 set.
- **Migrations (7)**: … → `phase3_inquisitor_schema` → `add_annotations_to_testimony_records` → `m1_witness_runtime_links` → `m2_disclosure_ledger`.

### Note
- The corpus-entry schema/compiler/export themselves live in the G_5.2 repo (`packages/witness-types`, `packages/orchestration`); see that repo's `docs/system-map.md` and `.kiro/specs/outreach-ready-corpus-entry/`.

---

## [0.5.0] — Phase 5 Alpha (Live)

### Added
- SEO/SAO/GEO optimization: sitemap.ts, robots.ts, llms.txt, JSON-LD structured data
- Submission lifecycle state machine (`src/lib/lifecycle.ts`) — single source of truth
- Admin cookie SHA-256 hashing (`src/lib/utils/crypto.ts`)
- PII Candidate Isolation architecture — testimony never leaves the server
- `ADMIN_EMAILS` environment variable (replaces hardcoded emails)

### Changed
- All documentation updated from "pre-alpha" to "Phase 5 Alpha (Live)"
- Drizzle schema (`src/lib/db/schema.ts`) fully reconciled against live Supabase DB
- Schema authority established: Live DB + checked migrations are the single source of truth
- Gate submit route rewritten with explicit early-return state transitions

### Fixed
- Gate state machine bug: `rejected_qualifier` was unreachable (always fell through to `processing_qualifier`)
- Admin cookie stored raw passphrase plain-text
- Hardcoded admin email addresses in source code
- PII pipeline sent full testimony text to OpenRouter for detection

### Schema Authority
- **Source of truth:** Live Supabase database + migration files
- **Drizzle schema:** Mirror only — reconciled on 2026-04-11
- **Tables (11):** summons, witness_submissions, witness_profiles, failure_log_entries, expert_targets, audit_log, gate_assessments, testimony_records, inquisitor_sessions, inquisitor_turns, synthesis_entries
- **Migrations (5):** phase0_foundation_schema → phase2_gate_vetting_schema → phase2_tighten_rls_policies → phase3_inquisitor_schema → add_annotations_to_testimony_records

---

## [Unreleased] — Platform V0.3

### Added
- Comprehensive documentation suite: PRD, SPEC, AGENTS.md
- Unified technology stack resolution across 14 documentation artifacts
- Phase-by-phase implementation plan with database schema evolution
- Drizzle ORM integration plan
- Sentry error monitoring integration plan
- Resend email integration plan for MHS Packet distribution
- RFC-3161 / IPFS provenance layer specification
- Claude API integration specification for Gate and Inquisitor
- Role-based access control specification

### Changed
- Technology stack standardized to Next.js 16 + Supabase (PostgreSQL) + Vercel
- All documentation discrepancies resolved (see Documentation Alignment section below)

### Fixed
- Resolved 6 technology contradictions across Operational Roadmap, Horizon Prospectus, LTFF Application, Compute Proposal, Data Governance Policy, and Governance Charter

---

## [0.2.0] — TWP-V0.2

### Added
- Site header with external navigation links
- About page with creator profiles
- Enhanced Reviewer Packet with detailed rubric display
- Stronger RLS policies (removed public SELECT/UPDATE on `witness_submissions`)
- TWP logo integration as `icon.png` favicon

### Changed
- Dev server port to 5000 for Replit compatibility
- Gate submissions now insert-only (no public read access)

---

## [0.1.0] — TWPV0.1

### Added
- Initial Next.js 16 scaffold with Tailwind CSS 4
- Landing page with email summons form
- The Gate page with essay submission (250-word minimum)
- Reviewer Packet page with rubric, exemplar, consent posture, limitations
- The Instrument page (mock Inquisitor chat UI)
- Animated particles background component
- Supabase integration with `summons` and `witness_submissions` tables
- EB Garamond + Cinzel font system
- Dark design system (#050505 background)

---

## Documentation Alignment Log

The following documentation files contained technology references that conflicted with the canonical stack. These conflicts are tracked here for transparency.

| Document | Original Reference | Canonical Replacement | Reason |
|---|---|---|---|
| Phase 1 Operational Roadmap | Firestore | Supabase (PostgreSQL) | RLS support, SQL compatibility, free tier |
| Phase 1 Operational Roadmap | Cloud Functions | Supabase Edge Functions + Next.js API Routes | Integrated auth, lower cost |
| Phase 1 Operational Roadmap | Google Cloud Storage | Supabase Storage | Integrated with auth, RLS |
| Phase 1 Operational Roadmap | Stackdriver | Sentry + Vercel Analytics | Free tier sufficient for Phase 5 Alpha |
| Horizon Europe Prospectus | Python/FastAPI | TypeScript / Next.js API Routes | Founder expertise, V0.2 continuity |
| Horizon Europe Prospectus | RabbitMQ | Supabase Webhooks + Edge Functions | Pilot scale sufficient |
| Horizon Europe Prospectus | PostgreSQL (generic) | Supabase (PostgreSQL) | Managed, auth-integrated |
| LTFF Grant Application | Firestore | Supabase (PostgreSQL) | Consistency with canonical stack |
| Compute Proposal | Vue.js references | React (Next.js) | V0.2 continuity |
| Data Governance Policy | AlloyDB | Supabase (PostgreSQL) → AlloyDB migration path when funded | Cost, simplicity |
| Governance Charter | Datadog | Sentry + Vercel Analytics | Free tier for Phase 5 Alpha |
