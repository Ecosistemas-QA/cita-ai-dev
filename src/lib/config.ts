export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // Optional, only for server-side admin
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

// Simple validation
if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Supabase URL and Anon Key are required in environment variables.');
}
