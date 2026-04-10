import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/failure-log — Public API for failure log entries.
 * Returns all published entries ordered by creation date.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("failure_log_entries")
      .select("id, category, title, description, severity, discovered_by, remedy, created_at")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch failure log" },
        { status: 500 }
      );
    }

    return NextResponse.json({ entries: data });
  } catch (err) {
    console.error("Failure log API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
