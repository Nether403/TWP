import { createClient } from "@/lib/supabase/server";
import { FailureLogFeed } from "@/components/protocol/failure-log-feed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Failure Log",
  description:
    "A public, append-only transparency feed documenting every known flaw, failure, and limitation of The Witness Protocol. Published because credibility requires honesty.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function FailureLogPage() {
  const supabase = await createClient();

  const { data: entries, error } = await supabase
    .from("failure_log_entries")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (
    <main className="relative min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-foreground text-glow uppercase">
            Failure Log
          </h1>
          <p className="text-sm text-muted-foreground/60 font-sans max-w-lg mx-auto leading-relaxed">
            The Foundation publishes its failures. This is an append-only feed
            documenting every known flaw, limitation, and error in the Protocol's
            methodology, security, and implementation. Entries are never deleted.
          </p>
          <p className="inline-block px-4 py-1 border border-border/40 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-serif">
            {entries?.length ?? 0} Recorded {entries?.length === 1 ? "Entry" : "Entries"}
          </p>
        </div>

        {/* Feed */}
        {error ? (
          <p className="text-center text-sm text-muted-foreground/40 font-sans">
            Unable to load failure log entries. This itself is a failure we should
            document.
          </p>
        ) : (
          <FailureLogFeed entries={entries ?? []} />
        )}
      </div>
    </main>
  );
}
