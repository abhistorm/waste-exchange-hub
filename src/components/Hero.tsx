
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import ImpactCounter from './ImpactCounter';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollValue = window.scrollY;
        const opacity = 1 - Math.min(scrollValue / 700, 0.8);
        const transform = `translateY(${scrollValue * 0.4}px)`;
        
        heroRef.current.style.opacity = String(opacity);
        heroRef.current.style.transform = transform;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-4 sm:px-6">
      {/* Background gradients with Indian flag-inspired colors */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-orange-200/20 rounded-full blur-[80px]" />
        <div className="absolute top-[30%] left-[-5%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-green-200/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-blue-200/20 rounded-full blur-[80px]" />
      </div>

      {/* Content */}
      <div 
        ref={heroRef}
        className="container mx-auto px-4 pt-10 sm:pt-16 md:pt-10 transform transition-transform duration-700"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-4 sm:mb-6 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-medium animate-fade-in">
            India's Leading Waste Management Platform
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 sm:mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Transform Industrial Waste into <span className="text-primary">Valuable Resources</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Connect with factories, industries and recyclers across India to buy, sell, and transform waste materials, 
            reducing environmental impact while creating economic opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <button className="btn-primary group w-full sm:w-auto text-sm sm:text-base">
              Start Exchanging
              <ArrowRight className="inline ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="btn-outline w-full sm:w-auto text-sm sm:text-base mt-3 sm:mt-0">
              Learn More
            </button>
          </div>
          
          {/* Impact Counter */}
          <div className="max-w-full sm:max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <ImpactCounter />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - hide on mobile */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center pt-1">
            <div className="w-1 h-3 bg-gray-400 rounded-full animate-pulse-soft"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
