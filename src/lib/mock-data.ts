
import { Material } from '@/types/material';
import { AuctionItem } from '@/types/auction';

// Sample auctions data
export const auctionData: AuctionItem[] = [
  {
    id: 1,
    materialId: 3,
    startingPrice: 0.60,
    currentBid: 0.75,
    minBidIncrement: 0.05,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    highestBidderId: 101,
    bids: [
      { id: 1, bidderId: 101, bidderName: "Green Recycling Co.", amount: 0.75, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { id: 2, bidderId: 102, bidderName: "EcoPlastics Inc.", amount: 0.70, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
      { id: 3, bidderId: 103, bidderName: "ReuseTech", amount: 0.65, timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000) }
    ],
    status: 'active'
  },
  {
    id: 2,
    materialId: 6,
    startingPrice: 0.10,
    currentBid: 0.20,
    minBidIncrement: 0.02,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    highestBidderId: 105,
    bids: [
      { id: 4, bidderId: 105, bidderName: "GlassMasters", amount: 0.20, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { id: 5, bidderId: 106, bidderName: "ClearCraft", amount: 0.18, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    ],
    status: 'active'
  },
  {
    id: 3,
    materialId: 2,
    startingPrice: 7.50,
    currentBid: 8.75,
    minBidIncrement: 0.25,
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    highestBidderId: 110,
    bids: [
      { id: 6, bidderId: 110, bidderName: "WoodWorks", amount: 8.75, timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000) },
      { id: 7, bidderId: 111, bidderName: "PalletPro", amount: 8.50, timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000) },
      { id: 8, bidderId: 112, bidderName: "EcoFurnish", amount: 8.00, timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000) },
      { id: 9, bidderId: 113, bidderName: "ReclaimCo", amount: 7.75, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    ],
    status: 'active'
  }
];

// Sample materials data
export const mockMaterials: Material[] = [
  {
    id: 1,
    title: "Metal Scraps - Aluminum",
    category: "Metals",
    description: "High-quality aluminum scraps from manufacturing process. Clean and sorted by type. These scraps are ideal for recycling into new products with minimal processing. All pieces are free from paint and other contaminants.",
    price: 1.20,
    quantity: "2 tons available",
    location: "Chicago, IL",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 101,
      name: "MetalWorks Industries",
      rating: 4.8
    },
    dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    status: 'available',
    views: 125,
    contactInfo: {
      email: "contact@metalworks.example",
      phone: "312-555-1234"
    },
    tags: ["aluminum", "manufacturing", "industrial", "metal scrap"]
  },
  {
    id: 2,
    title: "Wood Pallets - Untreated",
    category: "Wood",
    description: "Standard size untreated wood pallets in good condition. Perfect for upcycling projects, furniture making, or general reuse. All pallets are free from chemicals and treatments, making them safe for various applications.",
    price: 8.50,
    quantity: "75 units",
    location: "Denver, CO",
    isRecyclable: true,
    isAuction: true,
    seller: {
      id: 102,
      name: "WoodReuse Solutions",
      rating: 4.5
    },
    dateAdded: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    status: 'available',
    views: 87,
    contactInfo: {
      email: "info@woodreuse.example",
      phone: "720-555-6789"
    },
    tags: ["pallets", "untreated wood", "upcycle", "DIY"]
  },
  {
    id: 3,
    title: "Plastic Resin - HDPE",
    category: "Plastics",
    description: "Post-industrial HDPE plastic resin, clean and ready for reprocessing. Consistent quality and color, perfect for manufacturing recycled plastic products. This material has been thoroughly cleaned and processed to ensure high quality.",
    price: 0.75,
    quantity: "1.5 tons available",
    location: "Atlanta, GA",
    isRecyclable: true,
    isAuction: true,
    seller: {
      id: 103,
      name: "PlasticsRecycle Inc",
      rating: 4.7
    },
    dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    auction: auctionData[0],
    status: 'available',
    views: 203,
    contactInfo: {
      email: "sales@plasticsrecycle.example",
      phone: "404-555-3456"
    },
    tags: ["HDPE", "plastic resin", "manufacturing", "recycled material"]
  },
  {
    id: 4,
    title: "Textile Offcuts - Cotton",
    category: "Textiles",
    description: "Cotton fabric scraps from garment manufacturing. Various colors and sizes, suitable for quilting, craft projects, or recycling into new textiles. These high-quality cotton scraps are from a premium clothing manufacturer.",
    price: 2.15,
    quantity: "500 lbs available",
    location: "Los Angeles, CA",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 104,
      name: "FabricCycle",
      rating: 4.3
    },
    dateAdded: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    status: 'available',
    views: 65,
    contactInfo: {
      email: "hello@fabriccycle.example",
      phone: "323-555-7890"
    },
    tags: ["cotton", "fabric scraps", "textile waste", "craft materials"]
  },
  {
    id: 5,
    title: "E-Waste - Circuit Boards",
    category: "Electronics",
    description: "Used circuit boards from electronic devices. Contains valuable materials like gold, silver, and copper. Perfect for precious metal recovery or electronic components salvage. All boards have been carefully removed and sorted.",
    price: 3.80,
    quantity: "200 lbs available",
    location: "Boston, MA",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 105,
      name: "TechRecycle Inc",
      rating: 4.9
    },
    dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    status: 'available',
    views: 142,
    contactInfo: {
      email: "support@techrecycle.example",
      phone: "617-555-2345"
    },
    tags: ["e-waste", "circuit boards", "precious metals", "electronics"]
  },
  {
    id: 6,
    title: "Glass Cullet - Mixed Colors",
    category: "Glass",
    description: "Mixed color glass cullet suitable for recycling or artistic projects. Clean and free from contaminants, this crushed glass material can be melted down or used in decorative applications such as landscaping or art installations.",
    price: 0.15,
    quantity: "3 tons available",
    location: "Seattle, WA",
    isRecyclable: true,
    isAuction: true,
    seller: {
      id: 106,
      name: "GlassMasters",
      rating: 4.4
    },
    dateAdded: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    auction: auctionData[1],
    status: 'available',
    views: 98,
    contactInfo: {
      email: "info@glassmasters.example",
      phone: "206-555-8901"
    },
    tags: ["glass cullet", "recycled glass", "art materials", "construction material"]
  },
  {
    id: 7,
    title: "Paper Waste - Mixed Office Paper",
    category: "Paper",
    description: "Clean office paper waste including printer paper, documents, and notebooks. Ideal for paper recycling operations. This material has been pre-sorted to remove contaminants like plastic, staples, and paper clips.",
    price: 0.10,
    quantity: "1 ton available",
    location: "Austin, TX",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 107,
      name: "Office Green Solutions",
      rating: 4.2
    },
    dateAdded: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    status: 'available',
    views: 55,
    contactInfo: {
      email: "contact@officegreen.example",
      phone: "512-555-3456"
    },
    tags: ["paper waste", "office paper", "recycling", "pulp material"]
  },
  {
    id: 8,
    title: "Rubber Scraps - Automotive",
    category: "Rubber",
    description: "Rubber scraps from automotive manufacturing. Suitable for recycling into new rubber products or ground rubber applications. This material is free from metal components and has been pre-processed for easy integration into new manufacturing.",
    price: 0.50,
    quantity: "800 lbs available",
    location: "Detroit, MI",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 108,
      name: "AutoParts Recycling",
      rating: 4.6
    },
    dateAdded: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    status: 'pending',
    views: 112,
    contactInfo: {
      email: "sales@autoparts-recycling.example",
      phone: "313-555-9012"
    },
    tags: ["rubber", "automotive", "manufacturing waste", "recycled rubber"]
  }
];
