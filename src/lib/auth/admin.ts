/**
 * Admin Authentication — Centralized Guard
 * ═════════════════════════════════════════
 *
 * Replaces the deprecated ADMIN_PASSPHRASE / shared cookie pattern.
 *
 * Admin access requires:
 *   1. Valid Supabase Auth session (authenticated user)
 *   2. An active row in the `admin_roles` table for that user's auth.uid
 *
 * Usage in API routes:
 *   const { user, role, error } = await requireAdmin(request);
 *   if (error) return error; // NextResponse 401 or 403
 *
 * Bootstrap: insert via Supabase SQL editor or migration:
 *   INSERT INTO public.admin_roles (user_id, email, role)
 *   VALUES ('<supabase-auth-user-uuid>', 'founder@thewprotocol.info', 'admin');
 */

import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type AdminRole = "admin" | "hcc" | "sac" | "board";

export interface AdminUser {
  userId: string;
  email: string;
  role: AdminRole;
}

type RequireAdminResult =
  | { user: AdminUser; error: null }
  | { user: null; error: NextResponse };

/**
 * Verify caller is an authenticated admin.
 * Returns the admin user record, or a ready-to-return error NextResponse.
 */
export async function requireAdmin(): Promise<RequireAdminResult> {
  // 1. Verify Supabase Auth session
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      ),
    };
  }

  // 2. Check admin_roles table via service role client
  const { data: adminRole, error: roleError } = await supabaseAdmin
    .from("admin_roles")
    .select("user_id, email, role")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (roleError || !adminRole) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Forbidden. Administrator access required." },
        { status: 403 }
      ),
    };
  }

  return {
    user: {
      userId: adminRole.user_id,
      email: adminRole.email,
      role: adminRole.role as AdminRole,
    },
    error: null,
  };
}

/**
 * Narrow admin guard — requires a specific role.
 * E.g. requireAdminRole("hcc") for HCC-only endpoints.
 */
export async function requireAdminRole(
  requiredRole: AdminRole
): Promise<RequireAdminResult> {
  const result = await requireAdmin();
  if (result.error) return result;

  if (result.user.role !== requiredRole && result.user.role !== "admin") {
    return {
      user: null,
      error: NextResponse.json(
        { error: `Forbidden. ${requiredRole.toUpperCase()} role required.` },
        { status: 403 }
      ),
    };
  }

  return result;
}
