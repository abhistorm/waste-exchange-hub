
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarketplaceSection from '@/components/MarketplaceSection';
import ProcessSteps from '@/components/ProcessSteps';
import Benefits from '@/components/Benefits';
import Footer from '@/components/Footer';

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
        <ProcessSteps />
        <Benefits />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
