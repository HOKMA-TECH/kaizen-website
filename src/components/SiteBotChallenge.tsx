"use client";

import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.kaizenTurnstile = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Falha ao carregar verificação"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function getSiteTurnstileSiteKey() {
  const key = String(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "").trim();
  if (process.env.NODE_ENV === "production" && !key) {
    throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is required in production");
  }
  return key;
}

export function SiteBotChallenge({
  onToken,
}: {
  onToken: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [hint, setHint] = useState("");
  const siteKey = getSiteTurnstileSiteKey();

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        appearance: "always",
        retry: "auto",
        "refresh-expired": "auto",
        callback: (token: string) => {
          onToken(token || "");
          if (token) setHint("");
        },
        "expired-callback": () => {
          onToken("");
          setHint("A verificação expirou. Complete de novo.");
        },
        "error-callback": () => {
          onToken("");
          setHint("Não foi possível validar a verificação.");
        },
      });
    }).catch(() => setHint("Não foi possível carregar a verificação."));
    return () => {
      cancelled = true;
    };
  }, [onToken, siteKey]);

  if (!siteKey) {
    return (
      <p className="text-xs text-amber-400">
        Verificação desligada neste ambiente.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 pt-1">
      <div ref={containerRef} />
      {hint ? <p className="text-xs text-red-300">{hint}</p> : null}
    </div>
  );
}
