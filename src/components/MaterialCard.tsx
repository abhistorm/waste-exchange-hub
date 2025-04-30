
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Package, DollarSign, Recycle, Map, Gavel } from 'lucide-react';
import AuctionBadge from './AuctionBadge';
import AuctionDetails from './AuctionDetails';
import { AuctionItem } from '@/types/auction';
import { Material } from '@/types/material';
import { useToast } from '@/hooks/use-toast';

type MaterialCardProps = {
  material: Material;
  index?: number;
  className?: string;
};

export const MaterialCard = ({ material, index = 0, className }: MaterialCardProps) => {
  // Calculate animation delay based on index for staggered entrance
  const animationDelay = `${0.1 + index * 0.1}s`;
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);
  const { toast } = useToast();
  
  const handlePlaceBid = (bidAmount: number) => {
    if (!material.auction) return;
    
    // This would normally call an API to place the bid
    // For demonstration purposes, we'll just show a toast
    toast({
      title: "Bid placed successfully!",
      description: `You've placed a bid of $${bidAmount.toFixed(2)} on ${material.title}`,
    });
    
    setIsAuctionModalOpen(false);
  };

  const openAuctionDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (material.isAuction && material.auction) {
      setIsAuctionModalOpen(true);
    }
  };

  // Use a default placeholder image if no image is provided
  const imageUrl = material.image || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81";

  return (
    <div 
      className={cn(
        "group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in",
        className
      )}
      style={{ animationDelay }}
    >
      {/* Image with Link */}
      <Link to={`/material/${material.id}`} className="block relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
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
        
        {/* Auction Badge */}
        {material.isAuction && material.auction && (
          <div className="absolute top-3 left-3">
            <AuctionBadge 
              isAuction={true} 
              endTime={material.auction.endTime} 
            />
          </div>
        )}

        {/* Status badge if available */}
        {material.status && material.status !== 'available' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="px-3 py-1 bg-white text-black font-medium rounded uppercase text-sm">
              {material.status}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link to={`/material/${material.id}`} className="block">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
            {material.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {material.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-primary">
            {material.isAuction && material.auction ? (
              <>
                <Gavel className="h-4 w-4 mr-1" />
                <span className="font-semibold">
                  ${material.auction.currentBid > 0 
                    ? material.auction.currentBid.toFixed(2) 
                    : material.auction.startingPrice.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 ml-1">current bid</span>
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="font-semibold">${material.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500 ml-1">/ unit</span>
              </>
            )}
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
        <Link 
          to={`/material/${material.id}`}
          className="text-sm font-medium text-primary hover:underline transition-all"
        >
          View Details
        </Link>
        <button 
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          onClick={material.isAuction ? openAuctionDetails : undefined}
        >
          {material.isAuction ? "View Auction" : "Contact Seller"}
        </button>
      </div>
      
      {/* Auction Modal */}
      {material.isAuction && material.auction && (
        <AuctionDetails 
          auction={material.auction}
          onPlaceBid={handlePlaceBid}
          isOpen={isAuctionModalOpen}
          onClose={() => setIsAuctionModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MaterialCard;
