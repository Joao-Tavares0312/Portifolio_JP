import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Shell } from "./components/Shell";

// Clash Display (Indian Type Foundry, via Fontshare): licença gratuita para uso pessoal e comercial
const display = localFont({ src: "./fonts/ClashDisplay-Variable.woff2", weight: "200 700", display: "swap", variable: "--f-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--f-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });

export const metadata: Metadata = {
  title: "João Pedro | Desenvolvedor de produto",
  description:
    "Portfólio de João Pedro Tavares Vicente, desenvolvedor em Varginha, MG. Projetos: Fraus, TARS, Zero Bala e Voz Autista.",
  metadataBase: new URL("https://jpvicente.vercel.app"),
  openGraph: {
    title: "João Pedro | Desenvolvedor de produto",
    description: "Faço o produto inteiro: banco de dados, back-end, front e deploy. Fraus, TARS, Zero Bala e Voz Autista.",
    url: "/", siteName: "João Pedro", locale: "pt_BR", type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "João Pedro, desenvolvedor de produto" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
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
