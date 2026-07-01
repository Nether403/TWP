# Project Atlas — The Witness Protocol & Process Ergo Sum

> **Status: Current as of 2026-06-30.** This is the front-to-back orientation for the
> whole workspace: what each project is, how they connect, the one invariant that must
> never break, and where the authoritative docs live. It is intentionally
> high-level — for subsystem detail, follow the links into each repo.
>
> Authoritative companions: workspace map [`../../README.md`](../../README.md),
> working rules `.kiro/steering/witness-protocol.md`, the boundary decision
> [`../../GATE-PORTAL-BOUNDARY.md`](../../GATE-PORTAL-BOUNDARY.md), and the G_5.2
> subsystem map `G_5.2/docs/system-map.md`.

---

## 1. What this is (in one paragraph)

The **Witness Protocol** is a first-party, consented corpus of high-signal human
moral-reasoning testimony, built as an **evaluation substrate** and post-training
adaptation source for AI alignment. It is **not** a "wisdom archive" and does **not**
claim to "solve alignment." Alongside it runs **Process Ergo Sum (P-E-S)** — a public,
explicitly-simulated AI-persona experiment ("G_5.0: A Mind in Reflection"). The two
share a governed runtime engine but are kept as **separate identities** with separate
consent, data, and purpose. The near-term north star is **outreach-ready**: the
credibility state where a first small cohort can be invited to produce an initial
publishable corpus.

## 2. The four projects

This workspace (`Witnessprotocolmainproject/`) is an **umbrella container**, not a single
repo. Four independent projects ship and version on their own clocks (deliberate
polyrepo — see the root README's "Why separate repos").

| Folder | Role | Stack | Status |
|---|---|---|---|
| **`G_5.2/`** | **Governed runtime.** The engine: orchestration pipeline, memory/session machinery, evals, the Witness consent/testimony artifacts, the Corpus_Entry pipeline, the P-E-S research-data path, and operator tooling. | pnpm monorepo + Turbo (TypeScript), file-backed stores + Azure Blob | `v1` declared 2026-04-20; corpus-entry + P-E-S research collection are post-v1 additions |
| **`TWP-platform/`** | **Gate / control plane.** Intake & summons, the 3-tier Gate vetting, auth, consent records, contributor/reviewer flows, audit log, disclosure ledger, admin/dashboard, and the witness-bridge to the runtime. | Next.js 16 + Supabase + Drizzle, Vercel | Operational **Beta v0.9 (Live)** at thewprotocol.online |
| **`TWPWEB/`** | **Public information hub / portal.** Front-of-house: mission, six audience journeys, research library, media galleries, funding, and **explicitly-simulated** demos. Owns **no** consent/testimony surface; links out to the Platform. | Next.js 16 (static) + Tailwind 4 | Phase 5 — Beta (v0.9) |
| **`P-E-S/`** | **Process Ergo Sum persona SPA** ("G_5.0: A Mind in Reflection") at ProcessoErgoSum.info. Public chat with the G_5.0 persona; consumes the G_5.2 runtime as the `pes` product. | Vite + React + shadcn | Live; consent-gated research data collection shipped 2026-06-30 |

## 3. How they connect

```
                         ┌───────────────────────────────────────────┐
   public visitor        │                 G_5.2  (governed runtime)   │
        │                │                                             │
        │ chat (pes)     │   product registry → pes | witness          │
   ┌────▼─────┐  POST    │   orchestration: draft→critique→revise→mem  │
   │  P-E-S   │────────► │   ├─ pes:     inquiry sessions + (opt-in)    │
   │  SPA     │ /inquiry │   │           de-identified research store   │
   └──────────┘  /turn   │   └─ witness: consent gate + testimony +     │
                         │               Corpus_Entry compiler/export   │
   ┌──────────┐          │                         ▲                    │
   │ TWPWEB   │ links     └─────────────────────────┼────────────────────┘
   │ portal   │ out                                 │ witness-bridge (HTTP,
   └────┬─────┘                                      │ bridge-auth, no-store,
        │ participate/consent                        │ reference-only)
   ┌────▼───────────┐    Gate intake / consent /     │
   │ TWP-platform   │────reviewer / audit / ledger───┘
   │ (gate)         │    holds runtime testimony BY REFERENCE only
   └────────────────┘
```

- **P-E-S → G_5.2.** The SPA's only runtime call is `pesChat.ts → POST {VITE_G52_INQUIRY_URL}/api/inquiry/turn` with `product:"pes"`. No account identifier is attached.
- **TWP-platform ↔ G_5.2.** The control plane talks to the runtime over the **witness-bridge** (authenticated HTTP, `cache:"no-store"`). It persists only *linkage* (`witness_runtime_links`), never the dialogue body — it reads runtime testimony live by reference.
- **TWPWEB → TWP-platform.** The portal is front-of-house only; participation/consent are **outbound links** to the Platform via `lib/platform-links`. It never collects testimony or consent.
- **Gate ↔ Portal.** Today both have some front-of-house content; the agreed division (gate shrinks to control-plane, portal owns front-of-house) is recorded in `GATE-PORTAL-BOUNDARY.md`. Cleanup is deferred until the portal IA settles.

## 4. The invariant that must never break

**"Same engine, different identity. Reference across the boundary; never duplicate
sensitive bodies."**

Witness testimony, consent state, memory pools, publication rules, and governance policy
must never bleed into the P-E-S / G_5.0 persona space, and vice versa. The polyrepo
layout exists partly to enforce this by construction. Concretely:

- The runtime branches on `product.id` (`pes` vs `witness`) and uses **separate** policy
  roots, session stores, memory roots, and consent/testimony stores per product.
- P-E-S research data is its **own dataset** (`pes-research`) with its **own** consent and
  purpose; a machine-enforced **Boundary_Guard** rejects any attempt to write it into a
  Witness store/corpus/testimony artifact.
- "Testimony" means **two different artifacts** across the bridge — runtime dialogue
  (`TestimonyRecord`, source of truth in G_5.2) vs. the de-identified Gate-intake essay
  (`testimony_records` table in TWP-platform). They are never conflated. See the
  "Term disambiguation" section of `G_5.2/docs/system-map.md`.

## 5. The Witness data lifecycle (the spine)

1. **Summons / Gate (TWP-platform).** A candidate is vetted through the 3-tier Gate
   (AI sieve → AI qualitative → human review) and consents. Strict PII de-identification
   is applied before analysis.
2. **Inquiry (G_5.2 runtime).** The governed Inquisitor↔Witness dialogue produces a
   `TestimonyRecord` (`captured → retained → sealed → synthesized → withdrawn`),
   gated by the Witness consent gate.
3. **Corpus_Entry (G_5.2, post-v1).** The compiler seals a testimony ref plus
   human-authored sections (reasoning structure + eval case) into a `Corpus_Entry`
   (`0.1.0`), with public/private partitioning and three-layer hashing; bundle export
   emits the public triplet. The control-plane half (disclosure ledger, HCC
   outreach-readiness gate, revocation coordinator) lives in
   `TWP-platform/src/lib/witness-bridge/`.
   Spec: `.kiro/specs/outreach-ready-corpus-entry/`. Runbook:
   `G_5.2/docs/first-real-corpus-entry-runbook.md`. The milestone that matters is the
   **first REAL consented entry**.

The **eval case** is the model-facing artifact; behavior-change tooling
(WitnessBench / compiler) is a later phase. Treat that ordering as settled.

## 6. The P-E-S consent & research data path (shipped 2026-06-30)

The public chat lets anyone talk to G_5.0 **without registration** and **optionally**
opt in to having their (de-identified) conversation stored for the non-profit's research
purpose. Two hard guarantees, realized structurally:

- **Chat parity.** The conversation behaves identically whether consent is granted,
  declined, withdrawn, or never recorded — research collection is a *post-response
  side-effect* that can never block, delay, or alter the reply.
- **Dataset separation.** Research writes go through de-identify → Boundary_Guard →
  a dedicated `pes-research` store, and never touch the Witness consent gate or testimony
  persistence.

Other properties: active PII de-identification that **fails closed** (nothing stored if a
scrub can't complete), GDPR-shaped obligations (consent as lawful basis, DSAR
access/erasure, withdrawal that erases prior records, retention purge), a versioned
Privacy_Notice, and an optional Deepgram voice path that reuses the same de-identify →
store pipeline. Spec: `.kiro/specs/pes-chat-consent-data-collection/`. Code lives in
`G_5.2/packages/orchestration/src/pes/` + `apps/dashboard/src/server.ts` (runtime) and
`P-E-S/src/lib/` + `src/pages/Chat.tsx` (SPA).

> **Before public production enablement:** the Privacy_Notice / consent text is engineering
> placeholder copy carrying a machine-checkable `legalReviewRequired: true` flag; the
> production-enable path asserts it is cleared. It must be reviewed by qualified legal
> counsel first. (This is an engineering obligation, not legal advice.)

## 7. Where the authoritative docs live

| Topic | Canonical location |
|---|---|
| How to work here (rules) | `.kiro/steering/witness-protocol.md` |
| Workspace map | `../../README.md` |
| This atlas | `TWP-platform/docs/PROJECT-ATLAS.md` |
| G_5.2 subsystems (authoritative) | `G_5.2/docs/system-map.md` |
| G_5.2 mission/roadmap | `G_5.2/CURRENT_MISSION_AND_AUTHORITY_ORDER.md`, `G_5.2/g_52_project_overview_and_roadmap.md` |
| G_5.2 operations | `G_5.2/docs/operator-handbook.md`, `operator-quickstart.md`, `recovery-and-backups.md` |
| Platform product/spec/security | `TWP-platform/docs/PRD.md`, `SPEC.md`, `THREAT_MODEL.md`, `INCIDENT_RESPONSE.md`, `METHODOLOGY.md`, `DATASHEET.md`, `DISTRIBUTION_POLICY.md` |
| Witness bridge (M1/M2) | `TWP-platform/docs/m1-witness-bridge-contract.md`, `m1-witness-bridge-proof.md`, `m2-accepted-witness-lifecycle.md`, `m2-witness-revoke-proof.md` |
| Gate ↔ Portal boundary | `../../GATE-PORTAL-BOUNDARY.md` |
| Active specs | `.kiro/specs/outreach-ready-corpus-entry/`, `.kiro/specs/pes-chat-consent-data-collection/`, `TWPWEB/.kiro/specs/witness-protocol-portal/` |
| Cross-repo doc index | `../../Docs/README.md` (index only; canonical docs live in the repos) |

## 8. Build & verify (per repo)

- **G_5.2:** `pnpm typecheck`, `pnpm test`, `pnpm validate:witness`, `pnpm validate:canon`, `pnpm smoke` (+ `pnpm smoke:corpus`), eval harness.
- **TWP-platform:** `vitest`, `tsc` typecheck, Drizzle migration checks. Live Supabase + checked migrations are the source of truth (`schema.ts` mirrors them). **Not Neon.**
- **TWPWEB:** `pnpm typecheck`, `pnpm test` (unit + a11y + property + boundary), `pnpm build`.
- **P-E-S:** `tsc` typecheck + framework-free `node *.core.test.mjs` self-checks.

## 9. Known, deliberate alpha tradeoffs

- **`witness-types` contract is duplicated** between `TWP-platform` and
  `G_5.2/packages/witness-types` (separate npm projects). A shared published contract
  package is the eventual upgrade path. If acceptance conditions change, update both.
- **The P-E-S de-identifier mirrors** `TWP-platform/src/lib/ai/pii.ts` as logic rather than
  importing across the repo boundary — same reason.
- **HCC outreach-readiness is reviewer-asserted**, not fully machine-proven; only a couple
  of checks are machine-enforced. The G_5.2 compiler is the machine backstop (fails closed
  on containment / eval-standard / schema violations).
- **Gate/Portal front-of-house overlap** is temporary and tracked in the boundary note.

These are conscious v0.1 simplifications — don't "fix" them silently.
