import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ihgwaqnrnohbqmjlrgyp.supabase.co'
).replace(/\/rest\/v1\/?$/, '');

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZ3dhcW5ybm9oYnFtamxyZ3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxODc0MjYsImV4cCI6MjEwMjc2MzQyNn0.1QhJy6UfGquYEJ9EQxgFMoOlw3n108H-7dFn2NgMM2w';

const isBrowser = typeof window !== 'undefined';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser
  }
});

export const supabasePublic = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    }
  }
});
