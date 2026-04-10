-- Run this in your Supabase SQL Editor to create the required tables

-- 1. Table for email collection (The Summons)
CREATE TABLE IF NOT EXISTS public.summons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (REST API permissions)
ALTER TABLE public.summons ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert their emails
CREATE POLICY "Enable insert for anonymous users" 
ON public.summons FOR INSERT 
TO anon 
WITH CHECK (true);


-- 2. Table for the deep introspection essays (The Gate)
CREATE TABLE IF NOT EXISTS public.witness_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  essay_text TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  submission_status TEXT DEFAULT 'pending_sieve',
  
  -- Evaluation Rubric (0-5 scale)
  score_depth NUMERIC(3, 1),
  score_specificity NUMERIC(3, 1),
  score_ethics NUMERIC(3, 1),
  score_originality NUMERIC(3, 1),
  score_coherence NUMERIC(3, 1),
  score_cultural NUMERIC(3, 1),
  total_score NUMERIC(4, 2),
  reviewer_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.witness_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit essays (intake only)
CREATE POLICY "Enable insert for anonymous users" 
ON public.witness_submissions FOR INSERT 
TO anon 
WITH CHECK (true);

-- NOTE: SELECT and UPDATE access has been intentionally removed.
-- Curator/reviewer access to read and evaluate submissions requires
-- authenticated roles (e.g. Supabase Auth with role-based policies).
-- This is future work. Do not re-add public SELECT or UPDATE policies.


-- MIGRATION: Run this block if you previously had the open policies
-- to revoke them on an existing database:
--
-- DROP POLICY IF EXISTS "Enable read for all" ON public.witness_submissions;
-- DROP POLICY IF EXISTS "Enable update for all" ON public.witness_submissions;
