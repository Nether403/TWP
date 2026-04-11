# Datasheet for the Witness Protocol Corpus

> Following the format proposed by Gebru et al. (2021) "Datasheets for Datasets."  
> Version 1.0 · April 2026 · Stichting The Witness Protocol Foundation

---

## 1. Motivation

**Why was this dataset created?**  
The Witness Protocol Corpus is created to provide AI alignment researchers with a structured collection of human moral testimony — first-person accounts of ethical dilemmas, value conflicts, and moral reasoning from diverse global perspectives. The corpus is designed to serve as an empirical record of human moral wisdom, complementing philosophical and theoretical alignment approaches with grounded, specific testimony.

**Who created this dataset and on whose behalf?**  
Stichting The Witness Protocol Foundation, a Dutch non-profit (stichting). The Foundation operates independently of any AI laboratory, commercial entity, or government. No funder may influence the content, selection methodology, or publication decisions.

**Has the dataset been used in any published research?**  
Not yet. The corpus is in active collection phase (April 2026). This datasheet is published prospectively to establish transparency commitments before corpus release.

**Contact:**  corpus@thewprotocol.online

---

## 2. Composition

**What do the instances represent?**  
Each instance is a structured testimony from one human contributor ("Witness") consisting of:
- A Gate essay (750–2000 words): a first-person account of a moral dilemma or ethical decision in the Witness's professional or personal life
- An Inquisitor session transcript (up to 40 turns): a structured AI-facilitated dialogue probing the moral reasoning in the essay
- Semantic annotations: CAP (capabilities/boundaries), REL (relational ethics), and FELT (embodied experience) tags applied by human annotators

**How many instances are there?**  
The corpus is in active collection. Target corpus size for initial research release: 500 accepted testimonies. Current count: see the live Status page at thewprotocol.online/status.

**Is there a label associated with each instance?**  
Yes. Each testimony receives:
- Tier-1 AI Sieve score (0–100, pass/fail)
- Tier-2 AI Qualifier tags (CAP/REL/FELT) and scores (specificity, counterfactual reasoning, relational density, each 0–10)
- Tier-3 Human Curation Council decision (accept/reject, with scoring rubric)

**Does the dataset contain all possible instances or a sample?**  
A purposive, quality-filtered sample. The Gate pipeline (three-tier vetting) is an explicit quality filter. The corpus does not aim for random or representative sampling of human moral reasoning — it seeks a high-quality, high-signal subset.

**Are there recommended data splits?**  
Not currently established. A train/validation split recommendation will be developed in consultation with the Scientific Advisory Committee before the first public release.

---

## 3. Collection Process

**How was the data collected?**  
Contributors self-select after reading the Reviewer Packet (thewprotocol.online/packet), which explains the project's purpose and the testimony requirements. Consent is obtained before submission.

**Who collected it?**  
The Foundation operates an automated pipeline (Gate Tier 1 + 2) followed by Human Curation Council (HCC) review. The Inquisitor is an AI dialogue agent operating on accepted testimonies.

**What were the consent and ethics practices?**  
- Explicit, informed consent obtained at submission
- Consent is granular (internal research vs. external partner access vs. public subset — see Distribution Policy)
- Consent may be revoked at any time; revocation cascades to all linked records
- The privacy notice (thewprotocol.online/privacy) discloses all third-party AI processing

**Does the dataset relate to people?**  
Yes. All instances are first-person testimonies from identifiable individuals. De-identification is applied before corpus entry (see Section 4). The Foundation maintains a strict identity firewall between the Identity Vault and the research corpus.

**Did the individuals consent?**  
Yes. Submission is contingent on explicit opt-in consent. The consent form describes:
- The research purpose
- The three-tier vetting process
- Third-party AI processing (OpenRouter/Anthropic)
- All GDPR rights including revocation
- The absence of any commercial use of testimonies

---

## 4. Preprocessing / Cleaning / Labeling

**What preprocessing was applied?**  
1. **Regex de-identification (Pass 1):** Applied before any LLM call. Removes emails, phone numbers, URLs, SSNs, IP addresses, and specific dates.
2. **Candidate-isolation NER (Pass 2):** Heuristically extracts name/institution/location candidates; only candidates (not full text) are sent to an AI classifier for PII typing. Classified PII is substituted with typed placeholders (e.g., `[REDACTED_NAME]`, `[REDACTED_INSTITUTION]`).
3. **Human review:** HCC annotators may manually redact additional identifying details before corpus entry.

**Was the raw data saved?**  
Raw submissions are retained in an access-controlled vault (not accessible to researchers) until consent revocation, at which point they are permanently deleted.

**Was any labeling performed?**  
Yes. Human Curation Council annotators apply:
- CAP tags (capabilities/boundary themes)
- REL tags (relational ethics themes)
- FELT tags (embodied/experiential cues)
- A six-dimension rubric score (depth, specificity, ethics, originality, coherence, cultural grounding), each 0–5

**What is the inter-rater agreement methodology?**  
Tier-3 review uses blind dual-rater scoring. Cohen's kappa (κ) is computed per-assessment. The HCC maintains a target of κ ≥ 0.8 on tag agreement. Assessments below κ = 0.6 are flagged for reconciliation. See METHODOLOGY.md for the kappa formula and aggregation protocol.

---

## 5. Uses

**What has the dataset been used for?**  
Not yet published. Intended uses:
- Training and fine-tuning AI alignment models
- Evaluating moral reasoning capabilities of AI systems
- Comparative ethical philosophy research
- Cross-cultural moral psychology studies

**What uses are inappropriate?**  
- Any use that attempts to re-identify testimony contributors
- Training systems intended to manipulate or deceive humans
- Profiling individual contributors for any purpose
- Any use inconsistent with the contributor's consent scope (see Section 8)
- Use by organizations without a signed Data Use Agreement (for partner-access tier)

---

## 6. Distribution

**How will the dataset be distributed?**  
Three access tiers (see Distribution Policy at docs/DISTRIBUTION_POLICY.md):
- **Internal Research:** Full corpus accessible only to Foundation staff
- **Limited Partner:** De-identified corpus under signed DUA with research institutions
- **Public Subset:** Curated, opt-in-consented excerpts; license TBD (CC BY-NC-SA 4.0 under consideration)

**Is the dataset publicly available?**  
Not yet. A public subset is planned for future release after the corpus reaches sufficient size and quality.

---

## 7. Maintenance

**Who is responsible for maintaining the dataset?**  
The Human Curation Council (HCC) under oversight of the Scientific Advisory Committee (SAC). Contact: corpus@thewprotocol.online.

**How will errors, inconsistencies, or inaccuracies be corrected?**  
Via the Failure Log (thewprotocol.online/failure-log). All significant data quality issues are published within 72 hours of discovery.

**If consent is revoked, how is the corpus updated?**  
Revocation triggers deletion of the contributor's testimony, annotations, and session transcripts from all corpus layers. Any published derivative work citing the specific testimony is flagged for retraction review.

---

## 8. Demographics and Bias

**What are the known demographic gaps?**  
- **Geographic:** Initial outreach has focused on English-speaking contributors. Global South, East Asian, and indigenous perspectives are significantly underrepresented in the current collection phase.
- **Language:** The Gate essay prompt and Inquisitor are currently English-only. Non-native English speakers may face a quality bar that disadvantages testimony from non-Anglophone cultural contexts.
- **Selection bias:** The Gate's AI-based quality tiers (Tier 1 and 2) optimize for writing quality and structured argumentation. This may systematically disadvantage witnesses with lower formal education levels.
- **Self-selection:** Witnesses are self-selected from individuals who encounter the platform — likely biased toward tech-adjacent, ethically engaged demographics.

**Bias acknowledgment and mitigation plans:**  
- The SAC will publish an annual bias analysis of the corpus's demographic composition
- Targeted outreach programs are planned for underrepresented regions
- The Gate rubric is reviewed annually for cultural bias
- All bias findings are published in the Failure Log and in the annual SAC report

---

## 9. Ethical Considerations

- **Sensitive content:** Testimonies may describe trauma, abuse, moral injury, or other psychologically distressing experiences. The Inquisitor includes crisis detection and mandatory safety protocols.
- **Third-party AI disclosure:** As noted in the Privacy Notice, testimony text is processed by AI systems (OpenRouter/Anthropic) prior to corpus entry. This is disclosed at consent time.
- **Power dynamics:** Witnesses consent under conditions of epistemic asymmetry (they cannot fully predict how their testimony will be used). We mitigate this through granular consent, revocation rights, and transparency reporting.
- **No direct benefit to contributors:** Contributors receive no payment. Their benefit is participation in a research mission they endorse.
