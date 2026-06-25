import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-abyss px-5 pb-10 pt-16 text-white/80 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-kaizen.png"
                alt="Kaizen"
                width={44}
                height={44}
                className="h-10 w-10 object-contain [filter:brightness(0)_invert(1)]"
              />
              <div className="leading-none">
                <div className="font-display text-lg font-bold tracking-tight text-white">KAIZEN</div>
                <div className="text-[0.55rem] uppercase tracking-luxe text-white/60">Soluções Imobiliárias</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {SITE.tagline}. Há mais de 3 anos ajudando famílias de Campo Grande e da Zona
              Oeste a encontrarem o lar perfeito.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: SITE.instagram, label: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.42.7.82.9 1.4.18.45.37 1.05.43 2.25.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2a3.8 3.8 0 01-.9 1.4 3.8 3.8 0 01-1.4.9c-.45.18-1.05.37-2.25.43-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.8 3.8 0 01-1.4-.9 3.8 3.8 0 01-.9-1.4c-.18-.45-.37-1.05-.43-2.25C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.42-.43.82-.7 1.4-.9.45-.18 1.05-.37 2.25-.43C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.07-.9.04-1.4.2-1.7.32-.43.17-.74.37-1.06.7-.32.32-.52.63-.7 1.06-.12.3-.28.8-.32 1.7C3.45 9.05 3.44 9.4 3.44 12s0 3 .07 4.05c.04.9.2 1.4.32 1.7.17.43.37.74.7 1.06.32.32.63.52 1.06.7.3.12.8.28 1.7.32 1.05.06 1.4.07 4.05.07s3 0 4.05-.07c.9-.04 1.4-.2 1.7-.32.43-.17.74-.37 1.06-.7.32-.32.52-.63.7-1.06.12-.3.28-.8.32-1.7.06-1.05.07-1.4.07-4.05s0-3-.07-4.05c-.04-.9-.2-1.4-.32-1.7a2.9 2.9 0 00-.7-1.06 2.9 2.9 0 00-1.06-.7c-.3-.12-.8-.28-1.7-.32C15.5 4 15.1 4 12 4zm0 3.06A4.94 4.94 0 1112 17a4.94 4.94 0 010-9.88zm0 8.14A3.2 3.2 0 1012 8.6a3.2 3.2 0 000 6.6zm6.3-8.34a1.15 1.15 0 11-2.3 0 1.15 1.15 0 012.3 0z" },
                { href: SITE.facebook, label: "Facebook", d: "M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3-.04-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.34H7.3V14h2.85v8h3.35z" },
                { href: SITE.linkedin, label: "LinkedIn", d: "M6.94 7.5a1.94 1.94 0 11-.01-3.88A1.94 1.94 0 016.94 7.5zM5.3 9h3.3v11H5.3V9zm5.4 0h3.16v1.5h.05c.44-.83 1.5-1.7 3.1-1.7 3.3 0 3.9 2.18 3.9 5v6.2h-3.3v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V20h-3.3V9z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs uppercase tracking-luxe text-white/50">Navegação</div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs uppercase tracking-luxe text-white/50">Contato</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {SITE.phoneLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="max-w-xs leading-relaxed">{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.fullName}. {SITE.creci}.</p>
          <p>Desenvolvido por Hokma Tech.</p>
        </div>
      </div>
    </footer>
  );
}
