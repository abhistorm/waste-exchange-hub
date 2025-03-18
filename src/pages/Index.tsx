
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarketplaceSection from '@/components/MarketplaceSection';
import ProcessSteps from '@/components/ProcessSteps';
import Benefits from '@/components/Benefits';
import Footer from '@/components/Footer';
import CarbonCalculator from '@/components/CarbonCalculator';
import RecyclingAssistant from '@/components/RecyclingAssistant';
import ArtisanMarketplace from '@/components/ArtisanMarketplace';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Page transition animation class
  const pageClass = isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0";

  return (
    <div className={pageClass}>
      <Navbar />
      
      <main>
        <Hero />
        <MarketplaceSection />
        <ArtisanMarketplace />
        <ProcessSteps />
        <Benefits />
      </main>
      
      {/* Carbon Calculator accessible through a button in footer or elsewhere */}
      <div className="fixed left-6 bottom-6 z-10">
        <CarbonCalculator />
      </div>
      
      {/* Recycling Assistant chatbot */}
      <RecyclingAssistant />
      
      <Footer />
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
