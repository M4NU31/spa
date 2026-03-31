import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Sephirot Ark | ARK Survival Ascended Server",
  description: "Únete a Sephirot Ark — servidor ARK: Survival Ascended con mapas Astreos, Valguero y Servidor Rotativo. Comunidad activa, eventos semanales y admins dedicados.",
  alternates: { canonical: "https://sephirotark.com" },
  openGraph: {
    url: "https://sephirotark.com",
    images: [{ url: "/images/slide-astreus.jpg", width: 1200, height: 630, alt: "Sephirot Ark — ARK Survival Ascended" }],
  },
};

export default function Home() {
  return <PageShell />;
}
