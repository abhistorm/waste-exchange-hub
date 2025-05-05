
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
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
  };
  dateAdded: Date;
  image?: string;
  auction?: AuctionItem;
  status?: 'available' | 'pending' | 'sold';
  condition?: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  views?: number;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  tags?: string[];
  userId?: number; // ID of user who created the material
  isApproved?: boolean; // For admin approval workflow
  adminNotes?: string; // Admin feedback on listings
  paymentMethod?: 'cash' | 'online' | 'bank_transfer';
  deliveryOptions?: 'pickup' | 'delivery' | 'shipping';
  negotiable?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  dateJoined: Date;
  isVerified: boolean;
  listings?: number; // Count of user's listed materials
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }
  phone?: string;
}

export interface MaterialOrder {
  id: number;
  materialId: number;
  userId: number;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  trackingNumber?: string;
}
