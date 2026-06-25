const ITEMS = [
  "Compra",
  "Venda",
  "Avaliação gratuita",
  "Financiamento",
  "Lançamentos",
  "Documentação",
];

export default function Marquee() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={`${key}-${item}`} className="flex items-center">
          <span className="font-display px-6 text-sm font-semibold uppercase tracking-luxe text-muted sm:px-10">
            {item}
          </span>
          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-blue-600" aria-hidden>
            <path d="M12 0l2.8 9.2L24 12l-9.2 2.8L12 24l-2.8-9.2L0 12l9.2-2.8z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-abyss py-5" aria-hidden>
      <div className="marquee-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
