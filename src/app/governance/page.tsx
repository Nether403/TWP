import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "The governance structure, roles, and policy framework of The Witness Protocol Foundation. A Dutch stichting committed to transparency, independence, and academic rigor.",
};

const governanceBodies = [
  {
    name: "Board of Directors",
    role: "Strategic oversight and fiduciary governance",
    responsibilities: [
      "Approve annual budget and research priorities",
      "Appoint SAC and HCC leadership",
      "Maintain conflict of interest registry",
      "Publish quarterly governance reports",
      "Ensure compliance with ANBI requirements",
    ],
  },
  {
    name: "Scientific Advisory Committee (SAC)",
    role: "Methodological integrity and research standards",
    responsibilities: [
      "Approve and version the evaluation rubric",
      "Set Gate threshold parameters",
      "Review Inquisitor prompt design (Project Icarus)",
      "Validate inter-rater agreement methodology",
      "Audit annotation quality and corpus fitness",
    ],
  },
  {
    name: "Human Curation Council (HCC)",
    role: "Operational testimony processing and annotation",
    responsibilities: [
      "Conduct Gate Tier 3 alpha reviews (single reviewer)",
      "Apply CAP/REL/FELT annotation framework",
      "Develop inter-rater agreement methodology (Vision: κ ≥ 0.8)",
      "Flag systemic biases in corpus composition",
      "Report annotation challenges to the SAC",
    ],
  },
];

const policies = [
  {
    title: "Data Governance & Ethics Policy",
    summary: "Defines PII handling, consent architecture, data minimization principles, and the three-layer privacy model (Identity Vault → De-identified Corpus → Published Archive).",
  },
  {
    title: "Conflict of Interest Framework",
    summary: "All governance members must declare financial, institutional, and ideological conflicts. Declarations are logged immutably and published in redacted form.",
  },
  {
    title: "Consent Revocation Protocol",
    summary: "Any contributor may revoke consent at any time. Revocation cascades through all linked records: testimony, annotations, and Inquisitor transcripts are permanently deleted.",
  },
  {
    title: "Failure Publication Mandate",
    summary: "All significant failures — methodological, technical, or ethical — are published in the Failure Log within 72 hours of discovery. No exceptions.",
  },
  {
    title: "Independence Clause",
    summary: "No single funder, partner, or government may influence the Protocol's methodology, contributor selection, or published outputs. The Foundation reserves the right to refuse any funding with conditions.",
  },
  {
    title: "ANBI Compliance",
    summary: "As a Dutch stichting seeking ANBI status, the Foundation commits to public benefit principles: no private enrichment, transparent financial reporting, and mission-aligned expenditure.",
  },
];

const principles = [
  "Seriousness over speed. We will not rush methodology to produce outputs.",
  "Transparency over reputation. We publish our failures before our successes.",
  "Independence over scale. We will remain small rather than compromise methodology.",
  "Specificity over coverage. We prefer 50 deeply examined testimonies to 5,000 shallow ones.",
  "Humility over certainty. We claim methodological rigor, not methodological correctness.",
];

export default function GovernancePage() {
  return (
    <main className="relative min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-foreground text-glow uppercase">
            Governance
          </h1>
          <p className="text-sm text-muted-foreground/60 font-sans max-w-lg mx-auto leading-relaxed">
            The Witness Protocol Foundation is a Dutch non-profit (stichting)
            governed by a three-body structure designed to prevent capture,
            ensure methodological integrity, and maintain public accountability.
          </p>
        </div>

        {/* Governing Principles */}
        <section className="space-y-8">
          <h2 className="text-xl md:text-2xl tracking-widest uppercase text-foreground/80 text-center">
            Governing Principles
          </h2>
          <div className="space-y-4">
            {principles.map((principle, i) => (
              <div
                key={i}
                className="border-l border-border/30 pl-6 py-1"
              >
                <p className="text-sm text-muted-foreground/70 font-sans leading-relaxed">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Governance Bodies */}
        <section className="space-y-10">
          <h2 className="text-xl md:text-2xl tracking-widest uppercase text-foreground/80 text-center">
            Governance Structure
          </h2>
          {governanceBodies.map((body) => (
            <div
              key={body.name}
              className="border border-border/20 p-6 md:p-8 space-y-4"
            >
              <div className="space-y-1">
                <h3 className="font-serif text-base md:text-lg tracking-widest uppercase text-foreground/80">
                  {body.name}
                </h3>
                <p className="text-xs text-muted-foreground/50 font-sans">
                  {body.role}
                </p>
              </div>
              <ul className="space-y-2">
                {body.responsibilities.map((resp) => (
                  <li
                    key={resp}
                    className="text-sm text-muted-foreground/60 font-sans pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-muted-foreground/30"
                  >
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Policy Framework */}
        <section className="space-y-8">
          <h2 className="text-xl md:text-2xl tracking-widest uppercase text-foreground/80 text-center">
            Policy Framework
          </h2>
          <div className="space-y-4">
            {policies.map((policy) => (
              <div
                key={policy.title}
                className="border border-border/15 p-6 space-y-2"
              >
                <h3 className="font-serif text-sm tracking-widest uppercase text-foreground/70">
                  {policy.title}
                </h3>
                <p className="text-xs text-muted-foreground/55 font-sans leading-relaxed">
                  {policy.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <div className="text-center border-t border-border/10 pt-10">
          <p className="text-[10px] text-muted-foreground/30 tracking-widest uppercase font-sans">
            Governance charter v1.0 · Published April 2026 · Subject to revision by the Board
          </p>
        </div>
      </div>
    </main>
  );
}
