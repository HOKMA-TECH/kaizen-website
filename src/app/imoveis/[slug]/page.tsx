import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import { SITE } from "@/lib/site";
import {
  getPropertyBySlug,
  TYPE_LABELS,
  STATUS_LABELS,
  formatPrice,
} from "@/lib/realProperties";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) return { title: "Imóvel não encontrado" };
  const location = [p.neighborhood, p.city].filter(Boolean).join(", ");
  return {
    title: `${p.title} — ${TYPE_LABELS[p.type]}${location ? " em " + location : ""}`,
    description: p.description?.slice(0, 160) ?? undefined,
  };
}

export default async function PropertyDetail({ params }: Params) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) notFound();

  const images = (p.images && p.images.length > 0
    ? p.images
    : p.cover_image_url
      ? [p.cover_image_url]
      : []) as string[];
  const location = [p.neighborhood, p.city, p.state].filter(Boolean).join(", ");

  const specs = [
    p.bedrooms != null && { label: "Quartos", value: p.bedrooms },
    p.bathrooms != null && { label: "Banheiros", value: p.bathrooms },
    p.parking_spaces != null && { label: "Vagas", value: p.parking_spaces },
    p.area != null && { label: "Área", value: `${p.area} m²` },
  ].filter(Boolean) as { label: string; value: string | number }[];

  const waText = encodeURIComponent(
    `Olá! Tenho interesse no imóvel "${p.title}"${location ? " (" + location + ")" : ""}. Pode me enviar mais informações?`
  );

  return (
    <>
      <main className="relative min-h-screen bg-night px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/imoveis"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M8.7 16.7a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 1 1 1.4 1.4L4.41 9H18a1 1 0 1 1 0 2H4.41l4.3 4.3a1 1 0 0 1 0 1.4Z" />
            </svg>
            Voltar para imóveis
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <PropertyGallery images={images} title={p.title} />
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {STATUS_LABELS[p.status]}
                </span>
                <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-blue-400">
                  {TYPE_LABELS[p.type]}
                </span>
              </div>

              <h1 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.12] text-ink sm:text-4xl">
                {p.title}
              </h1>
              {location && (
                <p className="mt-2 flex items-center gap-1.5 text-muted">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.6]" aria-hidden>
                    <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {location}
                </p>
              )}

              <div className="font-display mt-5 text-3xl font-bold text-white">{formatPrice(p)}</div>

              {specs.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {specs.map((s) => (
                    <div key={s.label} className="rounded-xl border border-line bg-panel px-4 py-3">
                      <div className="text-xs uppercase tracking-wider text-faint">{s.label}</div>
                      <div className="mt-0.5 font-semibold text-ink">{s.value}</div>
                    </div>
                  ))}
                </div>
              )}

              <a
                href={`${SITE.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-6 w-full justify-center"
              >
                Tenho interesse
              </a>
            </div>
          </div>

          {(p.description || (p.features && p.features.length > 0)) && (
            <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              {p.description && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">Sobre o imóvel</h2>
                  <p className="mt-4 whitespace-pre-line leading-relaxed text-body">{p.description}</p>
                </div>
              )}
              {p.features && p.features.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">Diferenciais</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-line bg-panel px-3 py-1.5 text-sm text-body"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
