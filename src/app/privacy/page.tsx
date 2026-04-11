import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Privacy notice for The Witness Protocol Foundation. How we collect, process, and protect your personal data in accordance with GDPR and EDPB guidance.",
};

const lastUpdated = "April 2026";

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-foreground text-glow uppercase">
            Privacy Notice
          </h1>
          <p className="text-xs text-muted-foreground/50 font-sans">
            Last updated: {lastUpdated} · Version 1.0
          </p>
          <p className="text-sm text-muted-foreground/60 font-sans max-w-lg mx-auto leading-relaxed">
            This notice explains how Stichting The Witness Protocol Foundation
            ("the Foundation", "we", "us") collects, uses, protects, and shares
            your personal data. It is written in plain language and complies with
            the EU General Data Protection Regulation (GDPR) and EDPB guidance.
          </p>
        </div>

        {/* 1. Controller */}
        <Section title="1. Who We Are">
          <p>
            <strong>Controller:</strong> Stichting The Witness Protocol Foundation
            <br />
            <strong>Jurisdiction:</strong> Amsterdam, The Netherlands
            <br />
            <strong>Contact:</strong>{" "}
            <a
              href="mailto:privacy@thewprotocol.online"
              className="underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              privacy@thewprotocol.online
            </a>
          </p>
          <p>
            We are a Dutch non-profit research foundation (stichting) registered
            under Dutch law. Our mission is to collect high-signal human moral
            testimony for AI alignment research. We do not sell data, operate
            advertising, or have commercial interests in your information.
          </p>
        </Section>

        {/* 2. What we collect */}
        <Section title="2. Data We Collect and Why">
          <DataTable
            rows={[
              {
                category: "Email address",
                purpose: "To distribute the Reviewer Packet and notify you of decisions",
                basis: "Consent (Art. 6(1)(a))",
                retention: "Until you revoke consent or request deletion",
              },
              {
                category: "Testimony text (Gate essay)",
                purpose: "Core research data — moral reasoning analysis",
                basis: "Explicit consent (Art. 6(1)(a) + Art. 9(2)(a) for special-category data)",
                retention: "De-identified copy retained indefinitely; original deleted after processing",
              },
              {
                category: "Inquisitor session transcripts",
                purpose: "Structured extraction of moral reasoning",
                basis: "Explicit consent",
                retention: "De-identified version retained; raw transcript deleted upon consent revocation",
              },
              {
                category: "Authentication data",
                purpose: "Account security",
                basis: "Contract (Art. 6(1)(b)) — account creation",
                retention: "Until account deletion",
              },
              {
                category: "Pseudonym",
                purpose: "Persistent non-identifying label for research records",
                basis: "Legitimate interest (Art. 6(1)(f)) — research integrity",
                retention: "Retained until full consent revocation",
              },
            ]}
          />
        </Section>

        {/* 3. Special Category Data */}
        <Section title="3. Special-Category Data">
          <div className="border-l-2 border-red-500/30 pl-6 py-2 space-y-3">
            <p className="text-sm text-foreground/70 font-sans">
              <strong>We process special-category personal data.</strong>
            </p>
            <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
              Your testimony may reveal — intentionally or inadvertently — information
              about your health, sexual orientation, political opinions, religious or
              philosophical beliefs, racial or ethnic origin, or trade union membership.
              Under GDPR Art. 9, this data requires explicit consent and heightened
              protection.
            </p>
            <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
              <strong>Legal basis:</strong> We process this data solely on the basis of
              your explicit, informed consent (Art. 9(2)(a)). Consent is granular: you
              may consent to internal research use without consenting to external sharing.
              You may revoke consent at any time — see Section 6.
            </p>
            <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
              <strong>Protection measures:</strong> Testimony undergoes automated PII
              de-identification before it enters our research database. Original text is
              never published. Identity is never re-linked to testimony in research
              outputs.
            </p>
          </div>
        </Section>

        {/* 4. Third-party LLM processing */}
        <Section title="4. Third-Party AI Processing">
          <div className="border-l-2 border-amber-500/30 pl-6 py-2 space-y-3">
            <p className="text-sm text-foreground/70 font-sans">
              <strong>Your testimony is processed by third-party AI systems.</strong>
            </p>
            <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
              The Gate vetting process uses AI language models to assess testimony quality
              and extract semantic tags. These models are accessed via{" "}
              <strong>OpenRouter</strong> (a US-based API gateway) and include models
              from <strong>Anthropic</strong>.
            </p>
            <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
              <strong>What is sent:</strong> We apply a local regex de-identification pass
              (removing emails, phone numbers, URLs, and dates) <em>before</em> any text
              is sent to these systems. For named PII (persons, institutions, locations),
              we use a "candidate isolation" technique — only the suspected PII tokens
              are sent for classification, not the full testimony text.
            </p>
            <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
              <strong>Sub-processors:</strong> OpenRouter (sub-processor) routes requests
              to Anthropic. Both operate under standard commercial API terms. Cross-border
              transfers to the USA are made under Anthropic's and OpenRouter's standard
              contractual clauses and privacy policies.
            </p>
            <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
              <strong>Your rights:</strong> If you object to AI processing of your
              testimony, contact us at{" "}
              <a
                href="mailto:privacy@thewprotocol.online"
                className="underline underline-offset-4"
              >
                privacy@thewprotocol.online
              </a>
              . Note that AI processing is currently a core part of our vetting pipeline;
              opting out may mean we cannot process your submission.
            </p>
          </div>
        </Section>

        {/* 5. Data architecture */}
        <Section title="5. How We Protect Your Data">
          <p>
            We operate a three-layer privacy architecture:
          </p>
          <div className="space-y-4">
            {[
              {
                layer: "Identity Vault",
                description:
                  "Your email, authentication credentials, and pseudonym. Stored encrypted, access-controlled, never shared.",
              },
              {
                layer: "De-identified Corpus",
                description:
                  "Your testimony text after PII stripping and human annotation. Your identity is not associated with this layer. This is the research data.",
              },
              {
                layer: "Published Archive (future)",
                description:
                  "Curated, consented-for-publication excerpts. Only with your additional explicit opt-in. Does not exist yet.",
              },
            ].map((l) => (
              <div key={l.layer} className="border border-border/15 p-5 space-y-2">
                <h3 className="font-serif text-sm tracking-widest uppercase text-foreground/70">
                  {l.layer}
                </h3>
                <p className="text-xs text-muted-foreground/55 font-sans leading-relaxed">
                  {l.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
            All data is stored in Supabase (PostgreSQL) with row-level security policies.
            The platform is hosted on Vercel (EU edge nodes where possible). All database
            mutations are logged immutably to an audit trail.
          </p>
        </Section>

        {/* 6. Your Rights */}
        <Section title="6. Your Rights Under GDPR">
          <p>
            You have the following rights regarding your personal data. To exercise any
            of them, contact{" "}
            <a
              href="mailto:privacy@thewprotocol.online"
              className="underline underline-offset-4"
            >
              privacy@thewprotocol.online
            </a>
            . We will respond within 30 days.
          </p>
          <div className="space-y-3">
            {[
              {
                right: "Access (Art. 15)",
                detail:
                  "Request a copy of all personal data we hold about you, including your testimony, pseudonym, and audit log entries.",
              },
              {
                right: "Rectification (Art. 16)",
                detail: "Request correction of inaccurate personal data we hold.",
              },
              {
                right: "Erasure / Revocation (Art. 17 + consent withdrawal)",
                detail:
                  "Request deletion of all your data. This cascades: your email, account, testimony text, annotations, and Inquisitor session transcripts are permanently deleted. De-identified research data that cannot be re-linked to you may be retained.",
              },
              {
                right: "Restriction (Art. 18)",
                detail: "Request that we restrict processing while a dispute is under review.",
              },
              {
                right: "Portability (Art. 20)",
                detail:
                  "Request a machine-readable export of your personal data (testimony, session history, annotation tags applied to your record).",
              },
              {
                right: "Objection (Art. 21)",
                detail:
                  "Object to processing based on legitimate interest. Note: some processing is necessary for the research mission.",
              },
              {
                right: "Lodging a complaint",
                detail:
                  "You may lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) at autoriteitpersoonsgegevens.nl.",
              },
            ].map((r) => (
              <div
                key={r.right}
                className="border-l border-border/30 pl-5 py-1 space-y-1"
              >
                <p className="text-xs font-serif tracking-wide text-foreground/70 uppercase">
                  {r.right}
                </p>
                <p className="text-xs text-muted-foreground/55 font-sans leading-relaxed">
                  {r.detail}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 7. Cookies */}
        <Section title="7. Cookies and Session Data">
          <p>
            We use only essential cookies: authentication session tokens set by Supabase
            Auth. We do not use advertising cookies, tracking pixels, or third-party
            analytics beyond Sentry (error monitoring). Sentry is configured to
            scrub PII from error reports.
          </p>
        </Section>

        {/* 8. Changes */}
        <Section title="8. Changes to This Notice">
          <p>
            We will update this notice when our data practices change. Material changes
            will be announced to registered witnesses by email. The version date at the
            top of this page indicates when it was last revised.
          </p>
        </Section>

        {/* Footer note */}
        <div className="text-center border-t border-border/10 pt-10 space-y-2">
          <p className="text-[10px] text-muted-foreground/30 tracking-widest uppercase font-sans">
            Privacy Notice v1.0 · April 2026 · Stichting The Witness Protocol Foundation
          </p>
          <p className="text-[10px] text-muted-foreground/25 font-sans">
            Questions?{" "}
            <a
              href="mailto:privacy@thewprotocol.online"
              className="underline underline-offset-2"
            >
              privacy@thewprotocol.online
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

// ─── Layout helpers ───────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl md:text-2xl tracking-widest uppercase text-foreground/80">
        {title}
      </h2>
      <div className="space-y-4 text-sm text-muted-foreground/60 font-sans leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function DataTable({
  rows,
}: {
  rows: {
    category: string;
    purpose: string;
    basis: string;
    retention: string;
  }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-sans border-collapse">
        <thead>
          <tr className="border-b border-border/20">
            {["Data", "Purpose", "Legal Basis", "Retention"].map((h) => (
              <th
                key={h}
                className="text-left py-2 px-3 text-muted-foreground/40 uppercase tracking-widest font-normal"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.category}
              className="border-b border-border/10 hover:bg-white/[0.02] transition-colors"
            >
              <td className="py-3 px-3 text-foreground/70">{row.category}</td>
              <td className="py-3 px-3 text-muted-foreground/55">{row.purpose}</td>
              <td className="py-3 px-3 text-muted-foreground/55">{row.basis}</td>
              <td className="py-3 px-3 text-muted-foreground/55">{row.retention}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
