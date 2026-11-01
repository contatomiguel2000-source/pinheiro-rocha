import type { Metadata } from "next";
import { Inter, Marcellus_SC } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const marcellus = Marcellus_SC({ subsets: ["latin"], weight: "400", variable: "--font-marcellus", display: "swap" });

export const metadata: Metadata = {
  title: "Pinheiro Rocha | Arquitetura e Urbanismo",
  description:
    "Portfólio da arquiteta Laísy Pinheiro Rocha: fachadas, projetos residenciais e interiores em Bom Jardim de Minas, Juiz de Fora e região, e projetos online. +250 projetos.",
  openGraph: {
    title: "Pinheiro Rocha | Arquitetura e Urbanismo",
    description: "Arquitetura e rotina, para viver bem. Fachadas, casas e interiores.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${marcellus.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
