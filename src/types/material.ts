
import { AuctionItem } from './auction';

export interface Material {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: string;
  location: string;
  isRecyclable: boolean;
  isAuction: boolean;
  seller: {
    id: number;
    name: string;
    rating: number;
  };
  dateAdded: Date;
  image?: string;
  auction?: AuctionItem;
}
