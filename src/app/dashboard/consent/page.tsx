import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ConsentForm } from "./consent-form";

export const metadata: Metadata = {
  title: "Manage Consent",
  description: "Manage your data sharing and privacy preferences.",
};

export default async function ConsentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { createClient: createAdminClient } = await import("@supabase/supabase-js");
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: profile } = await supabaseAdmin
    .from("witness_profiles")
    .select("id")
    .eq("supabase_user_id", user.id)
    .single();

  let consentRecord = null;
  if (profile) {
    const { data } = await supabaseAdmin
      .from("consent_records")
      .select("*")
      .eq("witness_id", profile.id)
      .single();
    consentRecord = data;
  }

  return (
    <main className="relative min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light tracking-widest text-foreground text-glow uppercase">
            Data Consent
          </h1>
          <p className="text-sm text-muted-foreground/60 font-sans leading-relaxed">
            Manage how your de-identified testimony is utilized across the Foundation's access tiers.
          </p>
        </div>

        <ConsentForm initialData={consentRecord} />

        <div className="text-center border-t border-border/10 pt-10">
          <a
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 font-serif tracking-widest uppercase border-b border-transparent hover:border-foreground/20 pb-px"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
