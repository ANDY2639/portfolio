import { createClient } from '@supabase/supabase-js'

// Estas variables se cargarán desde el archivo .env.local en desarrollo
// y desde los secrets de GitHub Actions en producción
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. ' +
    'The app will use local fallback data.'
  )
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: false,
    },
  }
)
