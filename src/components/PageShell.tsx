"use client";

import { useState } from "react";
import IntroAnimation from "./IntroAnimation";
import Header from "./Header";
import HeroBanner from "./HeroBanner";
import MapsSection from "./MapsSection";
import EventsSection from "./EventsSection";
import InfoTabs from "./InfoTabs";
import AdminsSection from "./AdminsSection";
import Footer from "./Footer";

export default function PageShell() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}
      <div
        className={`transition-opacity duration-700 ${introDone ? "opacity-100" : "opacity-0"}`}
      >
        <Header />
        <main>
          <HeroBanner />
          <MapsSection />
          <EventsSection />
          <InfoTabs />
          <AdminsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
