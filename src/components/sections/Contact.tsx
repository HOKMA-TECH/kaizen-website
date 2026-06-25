"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/lib/site";

const INTERESTS = ["Comprar", "Vender", "Alugar", "Investir"];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", interest: "Comprar", msg: "" });

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".ct-reveal", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root }
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Olá, Kaizen! Meu nome é ${form.name || "—"}.\nInteresse: ${form.interest}.\nTelefone: ${form.phone || "—"}.\n${form.msg ? "Mensagem: " + form.msg : ""}`
    );
    window.open(`${SITE.whatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-xl border border-line bg-night px-4 py-3 text-ink placeholder:text-faint outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-600/15";

  return (
    <section id="contato" ref={root} className="bg-mesh-dark relative bg-abyss px-5 py-24 sm:px-8 lg:py-32">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        {/* Esquerda */}
        <div>
          <p className="ct-reveal eyebrow">Vamos conversar</p>
          <h2 className="ct-reveal font-display mt-5 text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            Encontre o seu imóvel <span className="text-blue-500">hoje mesmo</span>
          </h2>
          <p className="ct-reveal mt-5 max-w-md text-lg leading-relaxed text-body">
            Fale com um corretor especializado da Kaizen. Atendimento ágil, presencial ou
            virtual — do seu jeito.
          </p>

          <div className="ct-reveal mt-10 space-y-3">
            {[
              { label: "WhatsApp", value: SITE.phoneLabel, href: SITE.whatsapp, icon: "phone" },
              { label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}`, icon: "mail" },
              { label: "Endereço", value: SITE.address, href: undefined, icon: "pin" },
            ].map((c) => (
              <ContactRow key={c.label} {...c} />
            ))}
          </div>

          <p className="ct-reveal mt-8 text-xs uppercase tracking-luxe text-faint">{SITE.creci}</p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={submit}
          className="ct-reveal card-dark h-fit !translate-y-0 p-7 hover:!translate-y-0 sm:p-9"
        >
          <h3 className="font-display text-2xl font-bold text-ink">Fale com um corretor</h3>
          <p className="mt-1 text-sm text-muted">Responderemos pelo WhatsApp em instantes.</p>

          <div className="mt-6 space-y-4">
            <input
              required
              placeholder="Seu nome"
              className={field}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              placeholder="Seu telefone / WhatsApp"
              className={field}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <div>
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-faint">Quero</div>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((it) => (
                  <button
                    type="button"
                    key={it}
                    onClick={() => setForm({ ...form, interest: it })}
                    className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      form.interest === it
                        ? "bg-blue-600 text-white shadow-glow"
                        : "border border-line bg-night text-body hover:border-blue-500 hover:text-blue-400"
                    }`}
                  >
                    {it}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              placeholder="Conte o que procura (bairro, perfil, faixa de preço...)"
              className={`${field} resize-none`}
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
            />

            <button type="submit" className="btn btn-primary w-full justify-center">
              Enviar pelo WhatsApp
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: string;
}) {
  const icons: Record<string, React.ReactNode> = {
    phone: <path d="M3 5a2 2 0 012-2h2l2 5-2 1a11 11 0 005 5l1-2 5 2v2a2 2 0 01-2 2A16 16 0 013 5z" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  };
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-transparent p-2 transition-colors hover:border-line hover:bg-panel">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 ring-1 ring-blue-600/30">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current stroke-[1.6]"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {icons[icon]}
        </svg>
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-faint">{label}</div>
        <div className="text-ink">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
