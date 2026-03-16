import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Estas variables se cargarán desde el archivo .env.local en desarrollo
// y desde los secrets de GitHub Actions en producción
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables. The app will use local fallback data.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
