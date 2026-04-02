import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sephirotark.com"),
  title: {
    default: "Sephirot Ark | ARK Survival Ascended Server",
    template: "%s | Sephirot Ark",
  },
  description: "Servidor ARK: Survival Ascended con comunidad activa. Tres mapas: Astreos, Valguero y Servidor Rotativo. Eventos semanales, admins activos y gameplay balanceado.",
  keywords: ["ARK Survival Ascended", "ARK server", "Sephirot Ark", "servidor ARK", "Astreos", "Valguero", "ARK SA", "servidor ARK latino"],
  authors: [{ name: "Sephirot Ark" }],
  creator: "Sephirot Ark",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Sephirot Ark",
    title: "Sephirot Ark | ARK Survival Ascended Server",
    description: "Servidor ARK: Survival Ascended con comunidad activa. Tres mapas: Astreos, Valguero y Servidor Rotativo.",
    url: "https://sephirotark.com",
    images: [{ url: "/images/slide-astreus.jpg", width: 1200, height: 630, alt: "Sephirot Ark" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sephirot Ark | ARK Survival Ascended Server",
    description: "Servidor ARK: Survival Ascended con comunidad activa. Tres mapas: Astreos, Valguero y Servidor Rotativo.",
    images: ["/images/slide-astreus.jpg"],
  },
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${shareTechMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('sephirot-theme');if(t==='light')document.documentElement.classList.add('light');})();` }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScroll />
        <LanguageProvider>{children}</LanguageProvider>
        <script src="https://darkgoldenrod-duck-369698.hostingersite.com/embed/punchbug.js" data-key="pb_01ot5vkwpxxp_mngst6ls" async />
      </body>
    </html>
  );
}
