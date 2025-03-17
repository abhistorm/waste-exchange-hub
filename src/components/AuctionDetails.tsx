
import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, Tag, Users } from 'lucide-react';
import { AuctionItem, Bid } from '@/types/auction';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface AuctionDetailsProps {
  auction: AuctionItem;
  onPlaceBid: (bidAmount: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ 
  auction, 
  onPlaceBid, 
  isOpen, 
  onClose 
}) => {
  const [bidAmount, setBidAmount] = useState<number>(
    auction.currentBid > 0 
      ? auction.currentBid + auction.minBidIncrement 
      : auction.startingPrice
  );
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Calculate time remaining for the auction
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = auction.endTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft('Auction ended');
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft(
        `${days > 0 ? days + 'd ' : ''}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [auction.endTime]);

  const handleBidSubmit = () => {
    setError(null);
    
    // Validation
    if (auction.status !== 'active') {
      setError('This auction is no longer active');
      return;
    }
    
    if (bidAmount < auction.startingPrice) {
      setError(`Bid must be at least the starting price of $${auction.startingPrice}`);
      return;
    }
    
    if (auction.currentBid > 0 && bidAmount < auction.currentBid + auction.minBidIncrement) {
      setError(`Bid must be at least $${auction.currentBid + auction.minBidIncrement}`);
      return;
    }
    
    // Place bid
    onPlaceBid(bidAmount);
    toast({
      title: "Bid placed successfully!",
      description: `You've placed a bid of $${bidAmount.toFixed(2)}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Auction Details</DialogTitle>
          <DialogDescription>
            Place your bid on this material
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Auction status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-amber-600 font-medium">
              <Clock className="mr-2 h-5 w-5" />
              <span>{timeLeft}</span>
            </div>
            <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
              {auction.bids.length} bids
            </div>
          </div>
          
          {/* Current price */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Current Price</h4>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-primary mr-1" />
              <span className="text-2xl font-bold text-primary">
                {auction.currentBid > 0 ? auction.currentBid.toFixed(2) : auction.startingPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Minimum increment: ${auction.minBidIncrement.toFixed(2)}
            </div>
          </div>
          
          {/* Bid history */}
          {auction.bids.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Bids</h4>
              <ul className="space-y-2 max-h-32 overflow-y-auto">
                {auction.bids.slice(0, 5).map((bid, index) => (
                  <li key={bid.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{bid.bidderName}</span>
                    <span className="font-medium">${bid.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Place bid form */}
          {auction.status === 'active' ? (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Place Your Bid</h4>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400 absolute ml-2" />
                <Input
                  type="number"
                  className="pl-8" 
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={auction.currentBid > 0 ? auction.currentBid + auction.minBidIncrement : auction.startingPrice}
                  step={0.01}
                />
              </div>
              
              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <Alert className="mt-4 bg-amber-50 border-amber-200">
              <AlertDescription>
                This auction has {auction.status === 'ended' ? 'ended' : 'not started yet'}
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          {auction.status === 'active' && (
            <Button type="submit" onClick={handleBidSubmit}>Place Bid</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuctionDetails;
