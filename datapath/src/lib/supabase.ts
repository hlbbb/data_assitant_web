import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const isConfigured = !!(supabaseUrl && supabaseAnonKey)

if (!isConfigured) {
  console.info('Supabase not configured. Auth features disabled. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to enable.')
}

export const supabase: SupabaseClient = isConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzNjEwMTMsImV4cCI6MTk2MTkzNzAxM30.placeholder')

export const isSupabaseConfigured = isConfigured
