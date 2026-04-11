# Methodology: The Witness Protocol

> Version 1.0 · April 2026 · Stichting The Witness Protocol Foundation

## Overview

The Witness Protocol Foundation employs a multi-tiered pipeline designed to solicit, vet, and deeply interrogate human moral testimonies concerning value conflicts, moral injury, and ethical alignment. This document formalizes the architecture of that pipeline, the evaluation criteria at each layer, and the procedures for calculating inter-rater reliability.

## 1. The Gate (Three-Tier Vetting Pipeline)

Submissions ("Gate essays") are evaluated through three progressive tiers. A submission must pass all three to enter the primary research corpus.

### Tier 1: AI Sieve
- **Mechanism:** Automated evaluation using Claude 3 Haiku via OpenRouter.
- **Privacy:** Pre-flight regex stripping removes specific PII (emails, phone numbers, SSNs, IPs) before text is transmitted.
- **Criteria:** Basic coherence, relevance to the broad prompt of ethical sacrifice, substance over platitude, and sincerity (rejecting spam and low-effort generation).
- **Threshold:** Score ≥ 50/100 passes.

### Tier 2: AI Qualitative Assessment (The Qualifier)
- **Mechanism:** Automated evaluation using Claude 3 Opus/Sonnet via OpenRouter.
- **Criteria:** The Qualifier extracts semantic tags across three domains to structure the testimony for human review:
  - **CAP (Capabilities):** Themes related to limits, rules, boundaries, and systemic pressures.
  - **REL (Relational):** Themes related to interpersonal ethics, duty of care, betrayal, and loyalty.
  - **FELT (Somatic/Embodied):** Themes describing the phenomenological or physical experience of moral distress.
- **Scoring:** It also rates Specificity, Counterfactual reasoning, and Relational density (0–10).
- **Threshold:** Binary PASS/FAIL based on whether the text reveals genuine moral reasoning. Errs on the side of inclusion to privilege human review.

### Tier 3: Human Curation Council (HCC)
- **Mechanism:** Blind, dual-rater review by trained annotators via the Admin Console.
- **Process:** Reviewers assess the anonymized essay and the Tier-2 tags.
- **Threshold:** Both reviewers must accept the testimony. In cases of disagreement or low inter-rater reliability, the testimony is flagged for SAC reconciliation.

## 2. Inquisitor Dialogue Engine (Phase 3)

Accepted testimonies unlock the "Instrument"—an interactive session with the Inquisitor (powered by Claude 3.5 Sonnet).

- **Objective:** To probe the background assumptions, boundary conditions, and unresolved tensions of the original essay.
- **State Machine:** The dialogue depth is managed by a state machine tracking explicit turn counts (max 40) and escalating emotional intensity (Distress Levels 0-3).
- **Synthesis:** Every N turns, the dialogue is summarized to generate a "Distilled Thought," a cross-sectional insight stored independently in the `synthesis_entries` table.

## 3. Evaluation Science: Inter-Rater Reliability (IRR)

To maintain rigor in Tier 3, we calculate Cohen's Kappa ($$\kappa$$) on binary accept/reject decisions and categorical tag applications.

### Cohen's Kappa Formula
$$\kappa = \frac{p_o - p_e}{1 - p_e}$$
Where:
- $$p_o$$ = observed proportionate agreement
- $$p_e$$ = probability of random agreement

### Target Metrics
- **Tag Agreement:** Target $$\kappa \ge 0.8$$ (Near perfect agreement).
- **Flagging:** Annotations scoring $$\kappa < 0.6$$ are flagged for mandatory reconciliation by the SAC.

## 4. Privacy and PII De-identification

The platform maintains a strict commitment to data minimization through a "Candidate Isolation" architecture.

1. **Pre-LLM Regex Strip:** Fast local replacement of hard-format identifiers (emails, phone numbers).
2. **LLM Sequence Classifier:** Extracts entities (NER) from the text.
3. **De-identified Record:** Replaces extracted entities with domain-specific markers (e.g., `[REDACTED_ORGANIZATION]`). The original raw text is isolated in the secure vault.
