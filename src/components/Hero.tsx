
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ImpactCounter from './ImpactCounter';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      {/* Background gradients */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[-5%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-green-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-blue-400/10 rounded-full blur-[120px]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-24 h-24 border border-gray-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full opacity-30"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-green-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-yellow-400 rounded-full opacity-30"></div>

      {/* Content */}
      <div 
        ref={heroRef}
        className="container mx-auto px-4 pt-10 sm:pt-16 md:pt-10 transform transition-transform duration-700"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-4 sm:mb-6 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium animate-fade-in">
            India's Leading Waste Management Platform
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-4 sm:mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Transform Industrial <br className="hidden sm:block" />
            <span className="relative">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Waste into Value</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-300/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Connect with factories, industries and recyclers across India to buy, sell, and transform waste materials, 
            reducing environmental impact while creating economic opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <Link to="/material-marketplace">
              <Button size="lg" className="w-full sm:w-auto group px-6 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all">
                Start Exchanging
                <ArrowRight className="inline ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-6 group">
                Learn More
                <ArrowUpRight className="inline ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          {/* Impact Counter */}
          <div className="max-w-full sm:max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-up p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-gray-100" style={{ animationDelay: '0.8s' }}>
            <ImpactCounter />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - hide on mobile */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-8 h-14 border-2 border-gray-400 rounded-full flex justify-center pt-1">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse-soft"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
