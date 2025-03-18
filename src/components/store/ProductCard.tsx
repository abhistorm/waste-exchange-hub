
import React from 'react';
import { Product } from '@/types/store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Star, Recycle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 text-sm">
            <Leaf className="w-4 h-4" />
            <span>{product.sustainability.percentRecycled}% recycled</span>
          </div>
        </div>
        <CardTitle className="text-lg mt-2">{product.name}</CardTitle>
        <CardDescription className="flex justify-between mt-1">
          <span className="font-semibold text-base">${product.price.toFixed(2)}</span>
          <span className="text-gray-600">{product.seller}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {product.materials.map((material, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
            >
              {material}
            </span>
          ))}
        </div>
        
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Recycle className="w-3 h-3" />
          <span>Saved {product.sustainability.carbonSaved} kg CO2</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
