import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

/**
 * Creates a singleton Supabase client for the browser.
 * This client maintains the auth session (stored in localStorage by default).
 * Used by admin dashboard pages that need authenticated write access.
 */
export function createBrowserSupabase(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance

  supabaseInstance = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    }
  )

  return supabaseInstance
}
