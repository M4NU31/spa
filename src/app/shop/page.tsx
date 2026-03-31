import type { Metadata } from "next";
import ShopPage from "@/components/ShopPage";

export const metadata: Metadata = {
  title: "Tienda de Monedas",
  description: "Compra monedas de oro para Sephirot Ark. Paquetes desde 1000 hasta 3000 monedas. Pago seguro vía PayPal.",
  alternates: { canonical: "https://sephirotark.com/shop" },
  openGraph: {
    url: "https://sephirotark.com/shop",
    images: [{ url: "/images/slide-astreus.jpg", width: 1200, height: 630, alt: "Tienda de Monedas — Sephirot Ark" }],
  },
};

export default function Shop() {
  return <ShopPage />;
}
