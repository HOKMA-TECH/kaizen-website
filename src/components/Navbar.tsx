"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // esconde ao descer, mostra ao subir
      setHidden(y > 300 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[85] transition-all duration-500 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        solid
          ? "border-b border-line bg-night/80 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <button onClick={() => go("#hero")} className="flex items-center gap-3" aria-label="Kaizen — início">
          <Image
            src="/logo-kaizen.png"
            alt="Kaizen"
            width={40}
            height={40}
            priority
            className="h-9 w-9 object-contain [filter:brightness(0)_invert(1)]"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              KAIZEN
            </span>
            <span className="text-[0.55rem] uppercase tracking-luxe text-muted">
              Soluções Imobiliárias
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="group relative text-sm font-medium text-body transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden !py-2.5 text-sm sm:inline-flex"
          >
            Fale com um corretor
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-panel text-ink ring-1 ring-line lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-current transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      <div className={`overflow-hidden lg:hidden ${open ? "max-h-96" : "max-h-0"} transition-all duration-500`}>
        <div className="mx-5 mt-3 flex flex-col gap-1 rounded-2xl border border-line bg-panel p-3 shadow-card">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="rounded-xl px-4 py-3 text-left text-sm font-medium text-body hover:bg-panel-2 hover:text-blue-400"
            >
              {l.label}
            </button>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-1 justify-center text-sm"
          >
            Fale com um corretor
          </a>
        </div>
      </div>
    </header>
  );
}
