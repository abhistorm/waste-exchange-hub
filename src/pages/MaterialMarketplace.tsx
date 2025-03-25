
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MaterialListingForm from '@/components/MaterialListingForm';
import MaterialFilters from '@/components/MaterialFilters';
import MaterialGrid from '@/components/MaterialGrid';
import { Toaster } from '@/components/ui/toaster';
import { useMaterialMarketplace } from '@/hooks/useMaterialMarketplace';

const MaterialMarketplace = () => {
  const {
    materials,
    filteredMaterials,
    isLoaded,
    handleSearch,
    handleFilterSort
  } = useMaterialMarketplace();

  // Page transition animation class
  const pageClass = isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0";

  return (
    <div className={pageClass}>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero section with search */}
        <section className="py-12 bg-emerald-600 dark:bg-emerald-800">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Waste Material Marketplace
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Buy and sell recyclable waste materials. Give waste a second life and contribute to a circular economy.
            </p>
            <div className="flex justify-center mb-6">
              <MaterialListingForm />
            </div>
          </div>
        </section>
        
        {/* Main marketplace section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="lg:w-1/4">
                <MaterialFilters 
                  onSearch={handleSearch}
                  onFilterSort={handleFilterSort}
                />
              </div>
              
              {/* Materials grid */}
              <div className="lg:w-3/4">
                <MaterialGrid materials={filteredMaterials} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default MaterialMarketplace;
