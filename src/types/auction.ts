
export interface AuctionItem {
  id: number;
  materialId: number;
  startingPrice: number;
  currentBid: number;
  minBidIncrement: number;
  endTime: Date;
  highestBidderId: number | null;
  bids: Bid[];
  status: 'active' | 'ended' | 'pending';
}

export interface Bid {
  id: number;
  bidderId: number;
  bidderName: string;
  amount: number;
  timestamp: Date;
}
