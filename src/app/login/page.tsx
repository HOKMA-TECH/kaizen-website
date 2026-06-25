"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Turnstile from "react-turnstile";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaReady, setCaptchaReady] = useState(false);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (turnstileSiteKey && (!captchaToken || captchaToken.length < 20)) {
      setError("Complete o desafio de segurança (captcha) para continuar.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken: captchaToken ?? undefined },
    });
    setLoading(false);

    if (error) {
      const m = (error.message || "").toLowerCase();
      if (m.includes("captcha")) {
        setCaptchaToken(null);
        setError("Verificação de segurança expirada. Refaça o captcha e tente novamente.");
      } else if (m.includes("not confirmed") || m.includes("confirm")) {
        setError(
          "Usuário ainda não confirmado. No Supabase (Authentication → Users), confirme este e-mail (ou recrie marcando “Auto Confirm User”)."
        );
      } else if (m.includes("invalid login") || m.includes("credentials")) {
        setError("E-mail ou senha incorretos.");
      } else if (m.includes("too many")) {
        setError("Muitas tentativas. Aguarde alguns minutos e tente novamente.");
      } else {
        setError(error.message || "Não foi possível entrar.");
      }
      return;
    }

    const params = new URLSearchParams(window.location.search);
    router.push(params.get("redirectTo") || "/admin");
    router.refresh();
  };

  const field =
    "w-full rounded-xl border border-line bg-night px-4 py-3 text-ink placeholder:text-faint outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-600/15";

  return (
    <main className="bg-hero-gradient flex min-h-screen items-center justify-center px-5 py-20">
      <div className="card-dark w-full max-w-md !translate-y-0 p-8 hover:!translate-y-0">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-kaizen.png"
            alt="Kaizen"
            width={40}
            height={40}
            className="h-9 w-9 object-contain [filter:brightness(0)_invert(1)]"
          />
          <span className="font-display text-lg font-bold tracking-tight text-ink">KAIZEN</span>
        </Link>

        <h1 className="font-display mt-8 text-2xl font-bold text-ink">Painel de imóveis</h1>
        <p className="mt-1 text-sm text-muted">Entre com as credenciais de administrador.</p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-faint">E-mail</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
              placeholder="voce@kaizen.com.br"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-faint">Senha</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
              placeholder="••••••••"
            />
          </div>

          {turnstileSiteKey ? (
            <div className="flex justify-center pt-1">
              <Turnstile
                sitekey={turnstileSiteKey}
                theme="dark"
                onLoad={() => setCaptchaReady(true)}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                onError={() => {
                  setCaptchaReady(false);
                  setCaptchaToken(null);
                }}
              />
            </div>
          ) : (
            <p className="text-xs text-amber-400">
              Captcha não configurado: defina NEXT_PUBLIC_TURNSTILE_SITE_KEY nas variáveis de ambiente.
            </p>
          )}

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || (Boolean(turnstileSiteKey) && (!captchaReady || !captchaToken))}
            className="btn btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {turnstileSiteKey && !captchaReady && (
            <p className="text-center text-xs text-amber-400">Carregando verificação de segurança...</p>
          )}
        </form>

        <Link href="/" className="mt-6 block text-center text-sm text-muted transition-colors hover:text-ink">
          ← Voltar para o site
        </Link>
      </div>
    </main>
  );
}
