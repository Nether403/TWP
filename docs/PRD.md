# Product Requirements Document — The Witness Protocol Foundation Platform

> **Version:** 1.0 | **Date:** 2026-04-10  
> **Author:** Martin van Deursen, Founder & Chair  
> **Status:** Phase 5 Alpha (Live) | **Stage:** Instrument Maturation

---

## 1. Executive Summary

The Witness Protocol Foundation Platform is the operational infrastructure for a Dutch non-profit research institution (Stichting) dedicated to producing the world's first rigorously curated, permissioned corpus of structured human testimony for AI alignment research.

The platform is **not** a product. It is a research instrument. It has no commercial users, no revenue model, and no growth targets. Its sole purpose is to operationalize the Foundation's methodology: **elicit, vet, annotate, and archive high-signal human testimony** documenting ethical reasoning, counterfactual thinking, relational context, and embodied experience.

### Core Principle

> *"The intelligence we birth must inherit more than our chaos."*

### What This Is Not

- ❌ Not a social media platform
- ❌ Not a chatbot or AI assistant
- ❌ Not a survey tool or data collection service
- ❌ Not a commercial product of any kind
- ❌ Not a measurement instrument (it is a curation instrument)

---

## 2. Problem Statement

Every major AI system trained in the last decade was trained on humanity's uncurated digital exhaust — everything we've ever written, said, argued, confessed, celebrated, and regretted. Scale without gatekeeping produces systems that mirror humanity at scale but lack the capacity to distinguish wisdom from noise, conviction from confusion, ethical depth from surface-level pattern matching.

**The Flawed Parent Thesis:** AI systems inherit not only human wisdom but also humanity's biases, contradictions, and destructive impulses, because there is no epistemic gatekeeping in the training data supply chain.

**The Corrective:** A small, deliberately curated corpus of structured human testimony — specifically selected for ethical reasoning quality, counterfactual depth, relational awareness, and embodied experience — that can serve as a corrective alignment input.

---

## 3. User Personas

### 3.1 Foundational Witness (Contributor)

| Attribute | Detail |
|---|---|
| **Who** | AI safety researcher, ethicist, philosopher, Global South knowledge keeper, tech industry anchor voice |
| **Goal** | Contribute structured testimony to a serious research corpus |
| **Expectation** | Rigorous process, privacy, no gamification, intellectual peer treatment |
| **Interaction** | Invited → Gate assessment → Inquisitor dialogue sessions → review synthesized testimony |

### 3.2 Human Curation Council Member (Annotator)

| Attribute | Detail |
|---|---|
| **Who** | Trained qualitative researcher, ethicist, or domain expert |
| **Goal** | Apply CAP/REL/FELT annotation framework consistently |
| **Expectation** | Blind review assignments, clear rubric, inter-rater feedback |
| **Interaction** | Log in → review assigned testimony → apply tags → submit scores → view agreement metrics |

### 3.3 Board Member / SAC Member (Governor)

| Attribute | Detail |
|---|---|
| **Who** | Foundation board members, Scientific Advisory Council members |
| **Goal** | Oversee methodology, approve rubric changes, ensure compliance |
| **Expectation** | Transparency dashboards, vote recording, conflict-of-interest management |
| **Interaction** | Log in → review reports → vote on proposals → declare conflicts |

### 3.4 External Reviewer / Methodological Critic

| Attribute | Detail |
|---|---|
| **Who** | Independent researcher, journalist, or funder evaluating the Protocol |
| **Goal** | Assess the methodology's rigor and the Foundation's stage clarity |
| **Expectation** | Access to failure log, governance docs, rubric, exemplars — no marketing |
| **Interaction** | Visit public pages → request MHS Packet → review materials → provide feedback |

### 3.5 Research Partner (Consumer)

| Attribute | Detail |
|---|---|
| **Who** | AI safety researcher or Horizon Europe consortium member |
| **Goal** | Access the annotated corpus for alignment research |
| **Expectation** | Permissioned access, structured data, provenance verification |
| **Interaction** | Apply for access → receive API key → query corpus → download structured data |

---

## 4. Core Platform Subsystems

### 4.1 The Gate (Intake & Vetting)

The Gate is a multi-tiered contributor vetting system requiring three thresholds:

1. **Specificity Floor** — Concrete particulars, not abstract generalities
2. **Counterfactual Presence** — "If X had been different, then Y" reasoning
3. **Relational Context** — Naming those affected, acknowledging relational impact

**Tier 1: AI Sieve (Automated)**
- Spam/gibberish rejection
- Minimum quality threshold via Claude API
- Plagiarism detection against existing corpus
- Processing time: < 30 seconds
- Auto-reject ratio target: 60–70%

**Tier 2: AI Qualitative Analysis (Automated)**
- CAP tag extraction (Capabilities guardrails)
- REL tag extraction (Relational ethics)
- FELT tag extraction (Somatic/felt context)
- MHS criteria scoring
- Processing time: < 2 minutes

**Tier 3: Human Curation Council (Manual)**
- Blind dual-rater review
- 6-dimension rubric scoring (1–5 scale)
- Cohen's κ inter-rater agreement > 0.8
- Minimum composite score: 3.6 to advance

### 4.2 The Inquisitor (Dialogue Engine)

A non-subservient AI dialogue engine embodying the "Xenopsychologist" persona.

**Behavioral Constraints:**
- 70/30 question-to-statement ratio (hard-enforced per session)
- Steel-manning requirement: must demonstrate understanding before probing
- 5-Whys forcing function: recursive depth on key claims
- Safety guardrails: crisis detection, distress protocols, immediate exit capability
- No helpfulness bias: the Inquisitor challenges, it does not comfort

**Session Structure:**
- Opening: acknowledgment of Gate testimony, identification of key themes
- Core: structured inquiry across counterfactual, relational, and felt dimensions
- Synthesis: "Distilled Thought" generated every 15–20 turns
- Close: session summary, witness review opportunity

### 4.3 The Synthesis Engine

Automated distillation of apparent AI understanding of testimony themes.

- Generates "Distilled Thoughts" — summaries of what the AI understood, not interpretations
- Surfaces for witness review (read-only, no editing)
- Flags for annotator attention when themes diverge from corpus patterns

### 4.4 The Archive (Corpus)

The permissioned, tamper-evident, cryptographically timestamped repository.

- SHA-256 content hashing on all records
- RFC-3161 timestamping on finalized entries
- IPFS content addressing for published corpus
- Permissioned access via API with audit logging
- No commercial access, no data sales, no licensing without Board approval

### 4.5 The Failure Log

A public, append-only transparency feed documenting methodological weaknesses, bugs, design flaws, and honest assessments of what doesn't work.

- Required by the Foundation's "Falsifiability over Marketing" commitment
- Published publicly from day 1
- Categories: prompt, gate, annotation, security, methodology, other
- No editorial gatekeeping — if it's a flaw, it's published

---

## 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Privacy** | Constitutional constraint. No raw PII in LLM processing. GDPR-compliant. HIPAA Safe Harbor-inspired anonymization. |
| **Security** | Supabase RLS on all tables. JWT-based auth. Secrets in environment variables, never in code. Input validation via Zod schemas. |
| **Accessibility** | WCAG 2.1 AA compliant. Keyboard navigation for all workflows. Color-blind safe palette. |
| **Performance** | Page load < 1s. API response < 500ms (99th percentile). |
| **Auditability** | All state changes logged in `audit_log` table. Immutable, append-only. |
| **Provenance** | RFC-3161 timestamps + IPFS CIDs on all published corpus entries. |
| **Stage Clarity** | Every public surface explicitly states "Phase 5 Alpha (Live)" status. No marketing language. |

---

## 6. Design Language

### Aesthetic Mandate (from Press Kit)

> **"Stark minimalism. The Foundation's aesthetic signals gravity, not excitement."**

| Property | Value |
|---|---|
| Background | `#050505` (near-black) |
| Foreground | `#E0E0E0` (off-white) |
| Muted | `#808080` (mid-grey) |
| Border | `#1F1F1F` (dark grey) |
| Body font | EB Garamond (serif) |
| Heading font | Cinzel (classical serif) |
| Motion | Slow fades only (1–2s transitions). No bounce, no spin, no micro-animations |
| Particles | Subtle, slow-drifting white particles (from V0.2) |
| Logo | TWP circular wordmark (white on dark, black on light) |
| Register | Documentation, not marketing. Sober, not exciting. |

### What the Design Must Not Do

- ❌ No gradients (except subtle radial vignettes)
- ❌ No accent colors (no blue, no green, no primary red)
- ❌ No rounded corners (square/sharp edges only)
- ❌ No stock imagery of robots, neural networks, or "AI" visuals
- ❌ No gamification elements (no points, badges, levels, streaks)
- ❌ No social proof (no testimonial carousels, no "trusted by" badges)

---

## 7. Success Metrics (Minimum Viable Witness — Phase 1 Pilot)

| Metric | Target |
|---|---|
| MHS Packets distributed | 50 |
| Expert responses received | 10 |
| Gate submissions processed | 25 |
| Inquisitor sessions completed | 5 |
| Annotated testimony pages | 50 |
| Inter-rater agreement (κ) | > 0.8 |
| Failure log entries published | 10+ |
| Methodological critiques received | 3+ |

---

## 8. Out of Scope (explicitly deferred)

- Multi-language support (English-only for Phase 1)
- Mobile app
- Video/audio testimony processing
- Real-time collaboration on annotations
- Public API for third-party research tools
- Automated rubric calibration via ML
- Integration with existing alignment research platforms
