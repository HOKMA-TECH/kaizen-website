"use client";

import { SITE } from "@/lib/site";
import type { Property } from "@/lib/properties";

const STATUS_STYLE: Record<Property["status"], string> = {
  Venda: "bg-panel-2/90 text-body ring-1 ring-line",
  Lançamento: "bg-blue-600 text-white",
  Exclusivo: "bg-gradient-to-r from-blue-700 to-blue-500 text-white",
};

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="card-dark group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={`${p.title} — ${p.type} em ${p.neighborhood}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[p.status]}`}
        >
          {p.status}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-display text-2xl font-bold text-white">{p.price}</div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="text-xs uppercase tracking-wider text-blue-400">{p.type}</div>
        <h3 className="font-display mt-1.5 text-xl font-semibold text-ink">{p.title}</h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.6]" aria-hidden>
            <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {p.neighborhood}, {p.city}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-body">{p.blurb}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-sm text-muted">
          <span title="Quartos">{p.beds} qts</span>
          <span className="h-3 w-px bg-line" />
          <span title="Banheiros">{p.baths} ban</span>
          <span className="h-3 w-px bg-line" />
          <span title="Área">{p.area} m²</span>
          <span className="h-3 w-px bg-line" />
          <span title="Vagas">{p.parking} vagas</span>
        </div>

        <a
          href={`${SITE.whatsapp}?text=${encodeURIComponent(
            `Olá! Tenho interesse no imóvel "${p.title}" (${p.neighborhood}, ${p.price}). Pode me enviar mais informações?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-glow"
        >
          Tenho interesse
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current transition-transform group-hover:translate-x-1" aria-hidden>
            <path d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.29-4.3H2a1 1 0 1 1 0-2h13.59l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
          </svg>
        </a>
      </div>
    </article>
  );
}
