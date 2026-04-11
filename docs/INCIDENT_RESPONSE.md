# Incident Response Runbook

> Version 1.0 · April 2026 · Stichting The Witness Protocol Foundation

This document defines the procedures for responding to security, privacy, and operational incidents.

## 1. Severity Classification

- **SEV-0 (Critical):** Active breach. Unauthorized access to the Identity Vault, widespread PII leakage to public/partners, or compromise of the Supabase Service Role key.
- **SEV-1 (High):** PII leakage to sub-processors (failure of the regex/NER pipeline), admin account compromise, or prolonged system outage preventing Gate submissions.
- **SEV-2 (Moderate):** Minor bugs affecting scoring logic, failure of background workers causing delayed session updates, localized frontend rendering freezes.
- **SEV-3 (Low):** UI glitches, minor typos, individual user session errors.

## 2. Response Procedures

### For SEV-0 / SEV-1
1. **Containment:**
   - Immediately revoke compromised keys (Supabase Auth, OpenRouter API, Resend).
   - If necessary, put the Next.js application into Maintenance Mode via Vercel dashboard.
2. **Eradication & Recovery:**
   - Identify the vulnerability (check Sentry logs, Supabase audit logs).
   - Deploy hotfix.
   - Rotate any potentially exposed credentials.
3. **Notification (Internal):**
   - Notify the Board and the Scientific Advisory Committee (SAC) immediately.
4. **Notification (External):**
   - If PII is exposed, notify the Dutch DPA (Autoriteit Persoonsgegevens) within 72 hours per GDPR Art. 33.
   - Notify affected contributors via email.
   - Publish the incident to the public Failure Log (`/failure-log`).

### For SEV-2 / SEV-3
1. Log the issue in the central issue tracker.
2. Address in the standard sprint cycle.
3. If methodology is impacted (e.g., a bug in Kappa scoring), document the anomaly in the Failure Log.

## 3. Communication Plan

The Foundation prioritizes "Transparency over reputation." 

**The Failure Publication Mandate:** All significant failures—methodological, technical, or ethical—must be published in the public Failure Log within 72 hours of discovery. No exceptions. 

The Failure Log entry must include:
- Date of discovery
- Description of the failure
- Impact radius
- Remediation taken
