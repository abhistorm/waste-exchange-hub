
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
import { Recycle, Lightbulb, ArrowRight } from 'lucide-react';

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
        
        {/* AI Solutions CTA */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                  <Lightbulb className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore Our AI-Powered Solutions
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                  Use our advanced tools to analyze materials, calculate environmental impact, and get personalized recycling advice.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <Link to="/recycling-tips">
                  <Button size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all px-6 py-6">
                    <Lightbulb className="h-5 w-5" />
                    Get Recycling Tips
                  </Button>
                </Link>
                <Link to="/material-marketplace">
                  <Button size="lg" variant="outline" className="gap-2 border-emerald-200 hover:border-emerald-300 px-6 py-6">
                    <Recycle className="h-5 w-5" />
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <div className="flex justify-center">
                <Link to="/carbon-calculator" className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium group text-lg">
                  Calculate your environmental impact
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
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
