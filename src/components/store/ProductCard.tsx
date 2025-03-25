
import React from 'react';
import { Product } from '@/types/store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Star, Recycle, ShoppingCart } from "lucide-react";
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-200 dark:border-gray-700 group">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.sustainability.percentRecycled > 90 && (
          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
            100% Recycled
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
            <Leaf className="w-3 h-3" />
            <span>{product.sustainability.percentRecycled}% recycled</span>
          </div>
        </div>
        <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-2 h-10">
          {product.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="py-2 px-3 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg">₹{product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{product.seller}</span>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 h-8 mb-2">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {product.materials.map((material, idx) => (
            <span 
              key={idx} 
              className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full text-gray-600 dark:text-gray-400"
            >
              {material}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-500">
          <Recycle className="w-3 h-3" />
          <span>Saved {product.sustainability.carbonSaved} kg CO2</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-1 pb-3 px-3">
        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
