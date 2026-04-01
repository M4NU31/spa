import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Reporta un bug, denuncia a un jugador o apela un ban en Sephirot Ark.",
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
