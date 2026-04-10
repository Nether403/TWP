/**
 * Crypto utilities for admin authentication.
 * 
 * Uses Web Crypto API (available in Node.js 18+ and Edge runtimes)
 * to hash the admin passphrase before storing/comparing in cookies.
 */

const ADMIN_PEPPER = "twp_admin_v1_pepper";

/**
 * Compute a SHA-256 HMAC-style hash of the admin passphrase.
 * The pepper ensures the hash is unique to this application even
 * if the passphrase is reused elsewhere.
 */
export async function hashAdminPassphrase(passphrase: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${ADMIN_PEPPER}:${passphrase}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verify an admin cookie value against the expected passphrase.
 * Returns true if the cookie hash matches the hash of the expected passphrase.
 */
export async function verifyAdminCookie(
  cookieValue: string | undefined,
  expectedPassphrase: string | undefined
): Promise<boolean> {
  if (!cookieValue || !expectedPassphrase) return false;
  const expectedHash = await hashAdminPassphrase(expectedPassphrase);
  return cookieValue === expectedHash;
}
