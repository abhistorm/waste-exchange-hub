
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
import { Recycle, Lightbulb, UserPlus, LogIn } from 'lucide-react';

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
        
        {/* Auth CTA Section */}
        <section className="py-12 bg-indigo-50 dark:bg-indigo-950/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Sustainable Community
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Create an account to buy materials, contact sellers, list your own waste materials,
              and help build a more sustainable future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  <UserPlus className="h-5 w-5" />
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="outline" className="gap-2">
                  <LogIn className="h-5 w-5" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <ProcessSteps />
        <Benefits />
        
        {/* AI Solutions CTA */}
        <section className="py-12 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Explore Our AI-Powered Solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Use our advanced tools to analyze materials, calculate environmental impact, and get personalized recycling advice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/recycling-tips">
                <Button size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <Lightbulb className="h-5 w-5" />
                  Get Recycling Tips
                </Button>
              </Link>
              <Link to="/material-marketplace">
                <Button size="lg" variant="outline" className="gap-2">
                  <Recycle className="h-5 w-5" />
                  Browse Marketplace
                </Button>
              </Link>
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
