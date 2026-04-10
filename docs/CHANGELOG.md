# Changelog — The Witness Protocol Foundation Platform

All notable changes to this project will be documented in this file.

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
| Phase 1 Operational Roadmap | Stackdriver | Sentry + Vercel Analytics | Free tier sufficient for pre-alpha |
| Horizon Europe Prospectus | Python/FastAPI | TypeScript / Next.js API Routes | Founder expertise, V0.2 continuity |
| Horizon Europe Prospectus | RabbitMQ | Supabase Webhooks + Edge Functions | Pilot scale sufficient |
| Horizon Europe Prospectus | PostgreSQL (generic) | Supabase (PostgreSQL) | Managed, auth-integrated |
| LTFF Grant Application | Firestore | Supabase (PostgreSQL) | Consistency with canonical stack |
| Compute Proposal | Vue.js references | React (Next.js) | V0.2 continuity |
| Data Governance Policy | AlloyDB | Supabase (PostgreSQL) → AlloyDB migration path when funded | Cost, simplicity |
| Governance Charter | Datadog | Sentry + Vercel Analytics | Free tier for pre-alpha |
