"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateConsent(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
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

  if (!profile) {
    return { success: false, error: "Profile not found" };
  }

  // internal_research is essentially required and true baseline for submissions, but we'll read it
  const partnerSharing = formData.get("partner_sharing") === "on";
  const publicPublication = formData.get("public_publication") === "on";

  // Upsert the consent record
  const { error } = await supabaseAdmin
    .from("consent_records")
    .upsert({
      witness_id: profile.id,
      internal_research: true,
      partner_sharing: partnerSharing,
      public_publication: publicPublication,
      last_updated_at: new Date().toISOString()
    }, {
      onConflict: 'witness_id'
    });

  if (error) {
    console.error("Failed to update consent:", error);
    return { success: false, error: "Failed to update consent settings." };
  }

  revalidatePath("/dashboard/consent");
  return { success: true };
}
