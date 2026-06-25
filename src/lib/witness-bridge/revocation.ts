import type { SupabaseClient } from '@supabase/supabase-js';
import { listDisclosures, markRevoked } from './disclosure-ledger';

/**
 * Task 10 — revocation coordinator (TWP control plane).
 *
 * Composes the existing disclosure-ledger ops (Task 6): locate every exposure,
 * flip them to revoked (append-only — no deletes), then signal the governed
 * runtime. The ledger is the authoritative control-plane record, so it is
 * flipped first; the runtime signal is a best-effort sync that can be retried.
 *
 * Re-export is blocked control-plane-side via {@link assertEntryNotRevoked},
 * which any share/export-initiation path calls before producing a new bundle.
 */

/** Port for telling G_5.2 to mark the governed entry/bundle revoked. */
export type RuntimeRevocationSignal = (entryId: string) => Promise<void>;

export interface RevokeEntryResult {
  entryId: string;
  revokedExposures: number;
}

/** True if the entry has any revoked disclosure (control-plane revocation state). */
export async function isEntryRevoked(
  supabaseAdmin: SupabaseClient,
  entryId: string
): Promise<boolean> {
  const rows = await listDisclosures(supabaseAdmin, entryId);
  return rows.some((row) => row.revocationStatus === 'revoked');
}

/** Fail-closed guard for any re-export / re-share path. */
export async function assertEntryNotRevoked(
  supabaseAdmin: SupabaseClient,
  entryId: string
): Promise<void> {
  if (await isEntryRevoked(supabaseAdmin, entryId)) {
    throw new Error(`Corpus entry ${entryId} is revoked; export/share is blocked.`);
  }
}

export async function revokeEntry(
  supabaseAdmin: SupabaseClient,
  entryId: string,
  signalRuntimeRevocation: RuntimeRevocationSignal
): Promise<RevokeEntryResult> {
  const exposures = await listDisclosures(supabaseAdmin, entryId);

  // Ledger first (durable, no deletes); a signal failure leaves the ledger
  // correctly revoked and surfaces for operator retry.
  await markRevoked(supabaseAdmin, entryId);

  // ponytail: no live G_5.2 runtime-revocation endpoint yet — the caller injects
  // the signal. Upgrade path: wire this to a bridge POST that marks the governed
  // entry/bundle revoked so G_5.2 also fails closed on re-compile/re-export.
  await signalRuntimeRevocation(entryId);

  return { entryId, revokedExposures: exposures.length };
}
