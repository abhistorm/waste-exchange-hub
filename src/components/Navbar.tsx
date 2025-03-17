
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Package, Search, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-6",
        isScrolled 
          ? "py-2 bg-white/80 backdrop-blur-md shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center space-x-2 text-primary font-semibold text-xl transition-all duration-300 hover:opacity-80"
        >
          <Package className="h-6 w-6" />
          <span>WasteExchange</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#marketplace" className="text-gray-700 hover:text-primary transition-colors duration-200">Marketplace</a>
          <a href="#process" className="text-gray-700 hover:text-primary transition-colors duration-200">How It Works</a>
          <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors duration-200">Benefits</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition-colors duration-200">Contact</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-gray-700 hover:text-primary transition-colors duration-200">
            <Search className="h-5 w-5" />
          </button>
          <button className="btn-outline py-2">Sign In</button>
          <button className="btn-primary py-2">Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-700" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <a 
              href="#marketplace" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Marketplace
            </a>
            <a 
              href="#process" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#benefits" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefits
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="pt-2 border-t border-gray-200 flex flex-col space-y-2">
              <button className="btn-outline w-full">Sign In</button>
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
