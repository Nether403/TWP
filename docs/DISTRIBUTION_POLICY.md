# Distribution Policy

> Version 1.0 · April 2026 · Stichting The Witness Protocol Foundation

This policy governs access to the Witness Protocol Corpus. Because the corpus contains sensitive, special-category moral testimony, standard open-source data distribution models are inadequate. We employ a three-tiered access model based on granular contributor consent.

## Data Granularity

- **Identity Vault:** Contains names, emails, and authentication ties. *Never distributed.*
- **De-identified Corpus:** The core research database containing NER-redacted testimony, AI tags, HCC scores, and Inquisitor transcripts.
- **Abstracted Outputs:** High-level themes, "Distilled Thoughts" (Icarus outputs), and statistical metrics.

## Access Tiers

### 1. Internal Research Tier
- **Who:** Appointed Foundation researchers, HCC annotators, and SAC members.
- **Scope:** Full access to the De-identified Corpus.
- **Conditions:** Workspace-locked environment. Exporting raw row data is strictly prohibited. Identity Vault access is restricted to system administrators handling consent revocation operations.
- **Consent Requirement:** Baseline required consent for all submissions.

### 2. Limited Partner Tier
- **Who:** Vetted external academic and non-profit research teams.
- **Scope:** Read-only access to specific, bounded subsets of the De-identified Corpus relevant to their research domain.
- **Conditions:**
  1. Signed, legally binding Data Use Agreement (DUA).
  2. Proof of Institutional Review Board (IRB) or local ethics committee approval.
  3. Strict prohibition on attempts to re-identify witnesses or circumvent redactions.
  4. Obligation to share research findings with the Foundation prior to publication.
- **Consent Requirement:** Requires the contributor to check the "Partner Sharing" consent box.

### 3. Public Subset Tier
- **Who:** The general public.
- **Scope:** Highly curated, selected excerpts and aggregate statistical data.
- **Conditions:** Published under Creative Commons CC BY-NC-SA 4.0 (Attribution-NonCommercial-ShareAlike).
- **Consent Requirement:** Requires the contributor to explicitly check the "Public Publication" consent box. The HCC performs an additional high-scrutiny manual review of any excerpt before public release.

## Consent Revocation

Any contributor may revoke their consent entirely or downgrade their consent tier at any time via the Contributor Dashboard. 

If consent is completely revoked:
- The testimony is purged from the Internal Research tier.
- Partners utilizing the Partner Tier will be notified to wipe the associated ID from their local environments within 14 days (enforced by DUA audit clauses).
- If the data has already been published in the Public Subset or cited in a published paper, the Foundation will document the revocation but acknowledges that immediate global deletion of distributed public copies is technologically impossible. This limitation is explicitly stated during the opt-in process.
