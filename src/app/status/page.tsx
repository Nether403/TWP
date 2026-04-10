import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Current development status of The Witness Protocol Foundation platform. What exists, what is being built, and what does not yet exist.",
};

const statusSections = [
  {
    title: "Operational",
    description: "Live and functional in the current build.",
    items: [
      { name: "Landing Page", detail: "Public-facing entry point with email summons intake" },
      { name: "Email Summons", detail: "Supabase-backed registration for assessment distribution" },
      { name: "The Gate (UI)", detail: "Essay intake form with 250-word minimum and consent flow" },
      { name: "Reviewer Packet", detail: "Full rubric, exemplar, consent posture, and known limitations" },
      { name: "Failure Log", detail: "Public, append-only transparency feed — live from database" },
      { name: "Governance Charter", detail: "Published structure, roles, and policy framework" },
      { name: "About Page", detail: "Creator profiles and portfolio links" },
      { name: "Error Monitoring", detail: "Sentry SDK across all three runtimes (browser, server, edge)" },
    ],
  },
  {
    title: "In Development",
    description: "Actively being built or designed. Not yet functional.",
    items: [
      { name: "AI Gate (3-Tier Vetting)", detail: "Tier 1: AI Sieve → Tier 2: AI Qualitative → Tier 3: Human Review" },
      { name: "PII De-identification Pipeline", detail: "Detect, strip, and vault personally identifiable information" },
      { name: "Inquisitor Dialogue Engine", detail: "Claude-powered Xenopsychologist for structured testimony extraction" },
      { name: "Annotation Framework", detail: "CAP/REL/FELT tagging system with dual-rater agreement tracking" },
      { name: "Witness Authentication", detail: "Supabase Auth with email OTP for contributor login" },
      { name: "MHS Packet Email Distribution", detail: "Automated Resend integration for assessment dispatch" },
      { name: "Contributor Dashboard", detail: "Personal Gate progress, session history, and status tracking" },
    ],
  },
  {
    title: "Does Not Exist Yet",
    description: "Planned but not started. Listed for transparency.",
    items: [
      { name: "Completed Testimony Corpus", detail: "No testimony has been fully processed through all Gate tiers" },
      { name: "Published Research Outputs", detail: "No corpus analysis, no papers, no datasets yet released" },
      { name: "RFC-3161 Provenance Chain", detail: "Cryptographic timestamping not yet integrated" },
      { name: "IPFS Archival Layer", detail: "Content-addressed storage not yet implemented" },
      { name: "Synthesis Engine", detail: "Distilled Thought generation (every 15-20 turns) not built" },
      { name: "Constitutional Mirror", detail: "Cross-reference engine for corpus theme detection not built" },
      { name: "Board / SAC / HCC Portals", detail: "Governance operational dashboards not implemented" },
      { name: "GDPR Compliance Tooling", detail: "DSAR handling, consent audit, and data export/purge not built" },
    ],
  },
];

export default function StatusPage() {
  return (
    <main className="relative min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-foreground text-glow uppercase">
            Status
          </h1>
          <p className="text-sm text-muted-foreground/60 font-sans max-w-lg mx-auto leading-relaxed">
            An honest accounting of what The Witness Protocol Foundation has
            built, is building, and has not yet started. Updated with each
            development phase.
          </p>
          <p className="inline-block px-4 py-1 border border-border/40 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-serif">
            Phase 1 · Pre-Alpha
          </p>
        </div>

        {/* Status Sections */}
        {statusSections.map((section) => (
          <section key={section.title} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl tracking-widest uppercase text-foreground/80">
                {section.title}
              </h2>
              <p className="text-xs text-muted-foreground/50 font-sans">
                {section.description}
              </p>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="border border-border/15 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <h3 className="font-serif text-sm tracking-widest uppercase text-foreground/70">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground/50 font-sans sm:text-right max-w-sm">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Footer note */}
        <div className="text-center border-t border-border/10 pt-10">
          <p className="text-[10px] text-muted-foreground/30 tracking-widest uppercase font-sans">
            Last updated: April 2026 · This page will evolve with each development phase
          </p>
        </div>
      </div>
    </main>
  );
}
