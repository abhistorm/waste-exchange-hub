
import React from 'react';
import { Product } from '@/types/store';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-500 text-lg">No products match your current filters.</p>
          <p className="text-gray-400 mt-2">Try changing your filter settings.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
