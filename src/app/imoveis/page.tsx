import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PropertiesBrowser from "@/components/PropertiesBrowser";
import { getPublishedProperties } from "@/lib/realProperties";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Imóveis à venda e para alugar em Campo Grande - RJ",
  description:
    "Explore os imóveis da Kaizen Soluções Imobiliárias em Campo Grande e na Zona Oeste do Rio de Janeiro. Busque por bairro, tipo e finalidade.",
};

export default async function ImoveisPage() {
  const properties = await getPublishedProperties();

  return (
    <>
      <main className="relative min-h-screen bg-night px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-2xl">
            <p className="chapter-tag">Portfólio Kaizen</p>
            <h1 className="font-display mt-5 text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              Encontre o seu <span className="text-blue-500">próximo endereço</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-body">
              Imóveis selecionados em Campo Grande e na Zona Oeste do Rio. Busque por bairro,
              filtre por tipo e finalidade e fale com um corretor.
            </p>
          </header>

          <div className="mt-12">
            <PropertiesBrowser properties={properties} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
