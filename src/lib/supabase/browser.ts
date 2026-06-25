"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase para componentes client com sessão persistida em cookies
 * (compartilhada com o middleware). Usado no login e no painel /admin.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
