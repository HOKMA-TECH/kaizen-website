import Reveal from "@/components/Reveal";
import { DIFFERENTIALS } from "@/lib/properties";

const ICONS: Record<string, React.ReactNode> = {
  map: (
    <>
      <path d="M9 4l6 2 6-2v14l-6 2-6-2-6 2V6l6-2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  badge: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" />
    </>
  ),
  vr: (
    <>
      <rect x="2" y="7" width="20" height="11" rx="3" />
      <path d="M8 18l1.5-2.5a3 3 0 015 0L16 18" />
      <circle cx="8" cy="12" r="1" />
      <circle cx="16" cy="12" r="1" />
    </>
  ),
  chart: (
    <>
      <path d="M3 21h18" />
      <path d="M6 17v-5M11 17V7M16 17v-8M21 17V4" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9l9-6 9 6" />
      <path d="M4 9v10M8 9v10M12 9v10M16 9v10M20 9v10" />
      <path d="M2 21h20" />
    </>
  ),
};

export default function Differentials() {
  return (
    <section id="diferenciais" className="bg-mesh-dark relative bg-night px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Por que a Kaizen</p>
          <h2 className="font-display mt-5 text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            O diferencial de quem é{" "}
            <span className="text-blue-500">especialista na região</span>
          </h2>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((d) => (
            <div key={d.title} className="card-dark p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 ring-1 ring-blue-600/30">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-current stroke-[1.6]"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {ICONS[d.icon]}
                </svg>
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{d.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
