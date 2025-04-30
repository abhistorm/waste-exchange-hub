
import React, { useState } from 'react';
import MaterialListingForm from '@/components/MaterialListingForm';
import MaterialFilters from '@/components/MaterialFilters';
import MaterialGrid from '@/components/MaterialGrid';
import { Toaster } from '@/components/ui/toaster';
import { useMaterialMarketplace } from '@/hooks/useMaterialMarketplace';
import StoreLayout from '@/components/store/StoreLayout';
import { ArrowLeft, Upload, Filter, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const MaterialMarketplace = () => {
  const {
    materials,
    filteredMaterials,
    isLoaded,
    handleSearch,
    handleFilterSort,
    handleAddMaterial
  } = useMaterialMarketplace();
  
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);
  const { toast } = useToast();
  
  const onMaterialAdded = (material: any) => {
    handleAddMaterial(material);
    toast({
      title: "Material Listed Successfully",
      description: "Your material has been added to the marketplace.",
      duration: 3000,
    });
  };

  return (
    <StoreLayout isLoaded={isLoaded}>
      {/* Hero section with search */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center">
            <Link to="/store" className="mr-auto">
              <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Store
              </Button>
            </Link>
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Waste Material Marketplace
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Buy and sell recyclable waste materials. Give waste a second life and contribute to a circular economy.
            </p>
            <div className="flex justify-center mb-6">
              <MaterialListingForm onMaterialAdded={onMaterialAdded} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile filter toggle */}
      <div className="lg:hidden container mx-auto px-4 mt-4">
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center"
          onClick={() => setShowFiltersOnMobile(!showFiltersOnMobile)}
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters & Search
          </span>
          <span>{showFiltersOnMobile ? "Hide" : "Show"}</span>
        </Button>
      </div>
      
      {/* Main marketplace section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className={`${showFiltersOnMobile ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
              <div className="sticky top-24">
                <MaterialFilters 
                  onSearch={handleSearch}
                  onFilterSort={handleFilterSort}
                />
              </div>
            </div>
            
            {/* Materials grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-emerald-600" />
                  <h2 className="text-xl font-medium">Available Materials</h2>
                </div>
                <p className="text-gray-500 text-sm">
                  {filteredMaterials.length} {filteredMaterials.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              
              <MaterialGrid materials={filteredMaterials} isLoading={!isLoaded} />
              
              {filteredMaterials.length > 0 && (
                <div className="mt-8 text-center">
                  <Button 
                    variant="outline" 
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950/30"
                    onClick={() => {
                      toast({
                        title: "List your materials",
                        description: "Help contribute to the circular economy by listing your own materials.",
                      });
                      document.getElementById('list-materials-button')?.click();
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    List Your Own Materials
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
};

export default MaterialMarketplace;
