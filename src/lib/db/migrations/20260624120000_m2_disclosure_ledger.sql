-- M2: Disclosure ledger — append-only record of every public/partner exposure
-- of a Corpus_Entry, so a revocation cascade can reach every shared copy.
-- TWP is the control-plane source of truth for this ledger; G_5.2 stores only a
-- disclosure_manifest_hash in publication-bundle metadata.
--
-- Append-only discipline: rows are inserted on disclosure and only
-- revocation_status / revoked_at are ever mutated (on revocation). Rows are
-- never deleted, preserving an auditable retraction trail.

CREATE TABLE public.disclosure_ledger (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entry_id TEXT NOT NULL,
  publication_bundle_id TEXT NOT NULL,
  redacted_public_slice_hash TEXT NOT NULL,
  publication_bundle_hash TEXT,
  recipient_or_channel TEXT NOT NULL,
  disclosed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  consent_version_ref TEXT NOT NULL,
  terms_ref TEXT,
  revocation_status TEXT DEFAULT 'active' NOT NULL
    CHECK (revocation_status IN ('active', 'revoked', 'pending')),
  revoked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX disclosure_ledger_entry_id_idx
  ON public.disclosure_ledger (entry_id);

-- Control-plane only: no authenticated/anon access. Reached via the service
-- role from server-side admin flows; RLS is enabled with no permissive policy
-- so the table is closed by default.
ALTER TABLE public.disclosure_ledger ENABLE ROW LEVEL SECURITY;
