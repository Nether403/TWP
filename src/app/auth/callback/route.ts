import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /auth/callback
 * 
 * Handles the Supabase magic link callback.
 * Exchanges the token_hash for a session, then redirects to /gate.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as "email" | "magiclink" | null;
  const next = searchParams.get("next") ?? "/gate";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Authenticated — redirect to the Gate (or wherever `next` points)
      return NextResponse.redirect(new URL(next, origin));
    }

    console.error("Auth callback verification error:", error.message);
  }

  // If verification failed, redirect to login with error hint
  return NextResponse.redirect(
    new URL("/login?error=verification_failed", origin)
  );
}
