
import React from 'react';
import ProductGrid from '@/components/store/ProductGrid';
import StoreFilters from '@/components/store/StoreFilters';
import { Product } from '@/types/store';

interface StoreContentProps {
  filteredProducts: Product[];
  categories: string[];
  materials: string[];
  onFilterSort: (
    categories: string[],
    materials: string[],
    priceRange: [number, number],
    sortOption: string
  ) => void;
}

const StoreContent: React.FC<StoreContentProps> = ({
  filteredProducts,
  categories,
  materials,
  onFilterSort
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="lg:w-1/4">
            <StoreFilters 
              categories={categories}
              materials={materials}
              onFilterSort={onFilterSort}
            />
          </div>
          
          {/* Products grid */}
          <div className="lg:w-3/4">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreContent;
