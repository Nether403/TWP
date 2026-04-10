/**
 * Legacy Supabase client re-export.
 * New code should import from '@/lib/supabase/client' or '@/lib/supabase/server'.
 * This file exists for backward compatibility with V0.2 pages.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
