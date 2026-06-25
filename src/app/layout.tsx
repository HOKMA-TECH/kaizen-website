import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Cursor from "@/components/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.imobkaizen.com.br"),
  title: {
    default:
      "Kaizen Soluções Imobiliárias | A melhor imobiliária de Campo Grande - RJ",
    template: "%s · Kaizen Imóveis",
  },
  description:
    "A melhor imobiliária de Campo Grande, Zona Oeste do Rio de Janeiro. Compra, venda e avaliação de imóveis com corretores especializados (CRECI), visitas presenciais e virtuais.",
  keywords: [
    "imobiliária Campo Grande RJ",
    "imóveis Zona Oeste",
    "comprar casa Campo Grande",
    "apartamento Campo Grande RJ",
    "Kaizen Imóveis",
    "imobiliária Rio de Janeiro",
  ],
  openGraph: {
    title: "Kaizen Soluções Imobiliárias",
    description:
      "A melhor imobiliária de Campo Grande, Zona Oeste - RJ. Realizando sonhos através do imóvel ideal.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05080f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-night text-ink antialiased">
        <ScrollProgress />
        <Cursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppButton />
      </body>
    </html>
  );
}
