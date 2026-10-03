import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DeviceSimulator } from './components/DeviceSimulator';
import { WhatItMeasures } from './components/WhatItMeasures';
import { ClothingAdvisor } from './components/ClothingAdvisor';
import { ExplodedEngineering } from './components/ExplodedEngineering';
import { Why3DPrinting } from './components/Why3DPrinting';
import { HowItWorks } from './components/HowItWorks';
import { SmartSystemEvolution } from './components/SmartSystemEvolution';
import { UseCases } from './components/UseCases';
import { PrototypeTimeline } from './components/PrototypeTimeline';
import { ApiArchitecture } from './components/ApiArchitecture';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { SensorTelemetry } from './types';
import { DEFAULT_TELEMETRY } from './data/mockData';

export default function App() {
  const [telemetry, setTelemetry] = useState<SensorTelemetry>(DEFAULT_TELEMETRY);
  const [apiModalOpen, setApiModalOpen] = useState<boolean>(false);

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar Navigation */}
      <Navbar onOpenApiModal={() => setApiModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Screen */}
        <Hero
          onExploreDevice={() => handleScrollTo('device')}
          onHowItWorks={() => handleScrollTo('how-it-works')}
        />

        {/* 2. Device Screen & Interactive Simulator */}
        <DeviceSimulator
          currentTelemetry={telemetry}
          onUpdateTelemetry={setTelemetry}
        />

        {/* 3. What AirWall Measures (4 Cards & Interactive SVG Charts) */}
        <WhatItMeasures />

        {/* 4. What To Wear (Big automatic recommendation, explicit disclaimer, matrix) */}
        <ClothingAdvisor />

        {/* 5. Engineering & Exploded View (8 parts & interactive slider) */}
        <ExplodedEngineering />

        {/* 6. Why 3D Printing (4 advantages & print specs) */}
        <Why3DPrinting />

        {/* 7. How It Works Pipeline (Street -> Sensors -> MCU -> Processing -> Rec -> Display) */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* 8. Smart System Evolution (v1, v2, v3, City Mesh Network) */}
        <SmartSystemEvolution />

        {/* 9. Use Cases (Home, School, Office, Enterprise) */}
        <UseCases />

        {/* 10. Prototype Engineering Timeline (7 horizontal steps) */}
        <PrototypeTimeline />

        {/* 11. Final CTA */}
        <FinalCta
          onExploreEngineering={() => handleScrollTo('engineering')}
        />
      </main>

      {/* API & Real Sensor Architecture Modal */}
      <ApiArchitecture
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        onInjectPayload={(newTelemetry) => {
          setTelemetry(newTelemetry);
          handleScrollTo('device');
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
