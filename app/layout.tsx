import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Shell } from "./components/Shell";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--f-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });

export const metadata: Metadata = {
  title: "João Pedro | Desenvolvedor de produto",
  description:
    "Portfólio de João Pedro Tavares Vicente, desenvolvedor em Varginha, MG. Projetos: Fraus, TARS, Zero Bala e Voz Autista.",
  openGraph: { images: ["/work/fraus.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/* sem JS: nada de cortina presa nem texto parado no meio da entrada */}
        <noscript><style>{`.pre{display:none}.split__c,.page{animation:none!important}`}</style></noscript>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
