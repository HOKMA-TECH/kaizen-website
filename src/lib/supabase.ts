import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase (chave anônima/pública — somente leitura do que o RLS permite).
 * As variáveis vêm do ambiente; no preview da Vercel são herdadas do projeto.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase =
  isSupabaseConfigured
    ? createClient(url as string, anonKey as string, {
        auth: { persistSession: false },
      })
    : null;
