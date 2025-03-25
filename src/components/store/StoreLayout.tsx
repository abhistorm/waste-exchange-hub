
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

interface StoreLayoutProps {
  children: React.ReactNode;
  isLoaded: boolean;
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ children, isLoaded }) => {
  const pageClass = isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0";

  return (
    <div className={pageClass}>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default StoreLayout;
