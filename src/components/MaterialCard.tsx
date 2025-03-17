
import React from 'react';
import { cn } from '@/lib/utils';
import { Package, DollarSign, Recycle, Map } from 'lucide-react';

type MaterialCardProps = {
  material: {
    id: number;
    title: string;
    category: string;
    description: string;
    price: number;
    quantity: string;
    location: string;
    isRecyclable: boolean;
    image: string;
  };
  index: number;
  className?: string;
};

export const MaterialCard = ({ material, index, className }: MaterialCardProps) => {
  // Calculate animation delay based on index for staggered entrance
  const animationDelay = `${0.1 + index * 0.1}s`;

  return (
    <div 
      className={cn(
        "group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in",
        className
      )}
      style={{ animationDelay }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={material.image} 
          alt={material.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {material.category}
          </span>
        </div>
        {material.isRecyclable && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Recycle className="mr-1 h-3 w-3" />
              Recyclable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
          {material.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {material.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-primary">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="font-semibold">${material.price}</span>
            <span className="text-xs text-gray-500 ml-1">/ unit</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Package className="h-4 w-4 mr-1" />
            <span>{material.quantity}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <Map className="h-4 w-4 mr-1" />
          <span>{material.location}</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <button className="text-sm font-medium text-primary hover:underline transition-all">
          View Details
        </button>
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;
