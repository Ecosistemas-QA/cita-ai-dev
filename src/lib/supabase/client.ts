import { createBrowserClient } from '@supabase/ssr'
import { config } from '@/lib/config'
import { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    config.supabase.url,
    config.supabase.anonKey
  )
}
