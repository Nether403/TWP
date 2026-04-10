"use server";

import { cookies } from "next/headers";
import { hashAdminPassphrase } from "@/lib/utils/crypto";

export async function loginAdmin(formData: FormData) {
  const passphrase = formData.get("passphrase")?.toString();

  if (!passphrase) {
    return { success: false, error: "Passphrase is required." };
  }

  const expectedPassphrase = process.env.ADMIN_PASSPHRASE;

  if (!expectedPassphrase || passphrase !== expectedPassphrase) {
    return { success: false, error: "Invalid passphrase." };
  }

  // Hash the passphrase before storing in the cookie — never store raw secret
  const hashedValue = await hashAdminPassphrase(expectedPassphrase);

  const cookieStore = await cookies();
  cookieStore.set({
    name: "twp_admin_access",
    value: hashedValue,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("twp_admin_access");
}
