
import React from 'react';
import { Gavel, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuctionBadgeProps {
  isAuction: boolean;
  endTime?: Date;
  className?: string;
}

const AuctionBadge: React.FC<AuctionBadgeProps> = ({ isAuction, endTime, className }) => {
  if (!isAuction) return null;
  
  const now = new Date();
  const isEnding = endTime && (endTime.getTime() - now.getTime()) < 24 * 60 * 60 * 1000; // Less than 24 hours
  
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        isEnding 
          ? "bg-red-100 text-red-800" 
          : "bg-amber-100 text-amber-800",
        className
      )}
    >
      {isEnding ? (
        <>
          <Clock className="mr-1 h-3 w-3" />
          Ending Soon
        </>
      ) : (
        <>
          <Gavel className="mr-1 h-3 w-3" />
          Auction
        </>
      )}
    </div>
  );
};

export default AuctionBadge;
