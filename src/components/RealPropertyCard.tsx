import Link from "next/link";
import Image from "next/image";
import {
  type RealProperty,
  TYPE_LABELS,
  STATUS_LABELS,
  formatPrice,
  coverOf,
} from "@/lib/realProperties";

export default function RealPropertyCard({ p }: { p: RealProperty }) {
  const cover = coverOf(p);
  const location = [p.neighborhood, p.city].filter(Boolean).join(", ");

  return (
    <Link href={`/imoveis/${p.slug}`} className="card-dark group block overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-panel">
        {cover ? (
          <Image
            src={cover}
            alt={`${p.title} — ${TYPE_LABELS[p.type]} em ${location || p.city || ""}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-faint">Sem foto</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          {STATUS_LABELS[p.status]}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-display text-2xl font-bold text-white">{formatPrice(p)}</div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="text-xs uppercase tracking-wider text-blue-400">{TYPE_LABELS[p.type]}</div>
        <h3 className="font-display mt-1.5 line-clamp-1 text-xl font-semibold text-ink">{p.title}</h3>
        {location && (
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.6]" aria-hidden>
              <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {location}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-sm text-muted">
          {p.bedrooms != null && <span>{p.bedrooms} qts</span>}
          {p.bathrooms != null && (
            <>
              <span className="h-3 w-px bg-line" />
              <span>{p.bathrooms} ban</span>
            </>
          )}
          {p.area != null && (
            <>
              <span className="h-3 w-px bg-line" />
              <span>{p.area} m²</span>
            </>
          )}
          {p.parking_spaces != null && (
            <>
              <span className="h-3 w-px bg-line" />
              <span>{p.parking_spaces} vagas</span>
            </>
          )}
        </div>

        <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-400 transition-colors group-hover:text-glow">
          Ver detalhes
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current transition-transform group-hover:translate-x-1" aria-hidden>
            <path d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.29-4.3H2a1 1 0 1 1 0-2h13.59l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
