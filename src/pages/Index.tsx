
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
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

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
        
        {/* Store CTA Section */}
        <section className="py-12 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Discover Our Complete Recycled Products Store
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Browse our full collection of handcrafted items made from recycled materials.
              Find unique pieces and support sustainable artisans.
            </p>
            <Link to="/store">
              <Button size="lg" className="gap-2">
                <ShoppingBag className="h-5 w-5" />
                Visit Store
              </Button>
            </Link>
          </div>
        </section>
        
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
