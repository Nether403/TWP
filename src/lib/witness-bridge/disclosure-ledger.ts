import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Disclosure ledger (M2) — TWP control-plane source of truth for every
 * public/partner exposure of a Corpus_Entry.
 *
 * Append-only discipline: {@link recordDisclosure} inserts; {@link markRevoked}
 * only flips `revocation_status` / `revoked_at`. Rows are never deleted, so the
 * retraction trail stays auditable (design Property 4 / R8.4, R8.5).
 */

export type DisclosureRevocationStatus = 'active' | 'revoked' | 'pending';

export interface DisclosureLedgerRow {
  id: string;
  entryId: string;
  publicationBundleId: string;
  redactedPublicSliceHash: string;
  publicationBundleHash: string | null;
  recipientOrChannel: string;
  disclosedAt: string;
  consentVersionRef: string;
  termsRef: string | null;
  revocationStatus: DisclosureRevocationStatus;
  revokedAt: string | null;
}

export interface RecordDisclosureInput {
  entryId: string;
  publicationBundleId: string;
  redactedPublicSliceHash: string;
  publicationBundleHash?: string | null;
  recipientOrChannel: string;
  consentVersionRef: string;
  termsRef?: string | null;
}

function mapRow(row: Record<string, unknown>): DisclosureLedgerRow {
  return {
    id: row.id as string,
    entryId: row.entry_id as string,
    publicationBundleId: row.publication_bundle_id as string,
    redactedPublicSliceHash: row.redacted_public_slice_hash as string,
    publicationBundleHash:
      typeof row.publication_bundle_hash === 'string'
        ? row.publication_bundle_hash
        : null,
    recipientOrChannel: row.recipient_or_channel as string,
    disclosedAt: row.disclosed_at as string,
    consentVersionRef: row.consent_version_ref as string,
    termsRef: typeof row.terms_ref === 'string' ? row.terms_ref : null,
    revocationStatus: row.revocation_status as DisclosureRevocationStatus,
    revokedAt: typeof row.revoked_at === 'string' ? row.revoked_at : null,
  };
}

/** Append one disclosure exposure. Returns the inserted row. */
export async function recordDisclosure(
  supabaseAdmin: SupabaseClient,
  input: RecordDisclosureInput
): Promise<DisclosureLedgerRow> {
  const payload = {
    entry_id: input.entryId,
    publication_bundle_id: input.publicationBundleId,
    redacted_public_slice_hash: input.redactedPublicSliceHash,
    publication_bundle_hash: input.publicationBundleHash ?? null,
    recipient_or_channel: input.recipientOrChannel,
    consent_version_ref: input.consentVersionRef,
    terms_ref: input.termsRef ?? null,
    revocation_status: 'active' as const,
  };

  const { data, error } = await supabaseAdmin
    .from('disclosure_ledger')
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapRow(data as Record<string, unknown>);
}

/** List every recorded exposure for an entry (the revocation-cascade target set). */
export async function listDisclosures(
  supabaseAdmin: SupabaseClient,
  entryId: string
): Promise<DisclosureLedgerRow[]> {
  const { data, error } = await supabaseAdmin
    .from('disclosure_ledger')
    .select('*')
    .eq('entry_id', entryId);

  if (error) {
    throw error;
  }

  return (data as Record<string, unknown>[] | null)?.map(mapRow) ?? [];
}

/**
 * Mark exposures of an entry revoked. Updates `revocation_status = 'revoked'`
 * and stamps `revoked_at`; never deletes rows. Optionally scope to a single
 * recipient/channel.
 */
export async function markRevoked(
  supabaseAdmin: SupabaseClient,
  entryId: string,
  recipientOrChannel?: string
): Promise<void> {
  let query = supabaseAdmin
    .from('disclosure_ledger')
    .update({
      revocation_status: 'revoked',
      revoked_at: new Date().toISOString(),
    })
    .eq('entry_id', entryId);

  if (recipientOrChannel !== undefined) {
    query = query.eq('recipient_or_channel', recipientOrChannel);
  }

  const { error } = await query;

  if (error) {
    throw error;
  }
}
