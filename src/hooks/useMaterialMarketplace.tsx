
import { useState, useEffect } from 'react';
import { Material } from '@/types/material';

// Mock material data
const mockMaterials: Material[] = [
  {
    id: 1,
    title: "Plastic Bottles (PET)",
    description: "Clean plastic bottles, labels removed, caps separate.",
    category: "Plastics",
    price: 25.00,
    quantity: "50kg",
    location: "Mumbai",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 101,
      name: "Green Recyclers Ltd",
      rating: 4.8
    },
    dateAdded: new Date(2023, 6, 10)
  },
  {
    id: 2,
    title: "Copper Wire Scrap",
    description: "Electrical copper wire, clean and stripped of insulation.",
    category: "Metals",
    price: 350.00,
    quantity: "10kg",
    location: "Delhi",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 102,
      name: "MetalWorks Industries",
      rating: 4.5
    },
    dateAdded: new Date(2023, 6, 15)
  },
  {
    id: 3,
    title: "Mixed Paper Waste",
    description: "Newspapers, magazines, and cardboard packaging.",
    category: "Paper",
    price: 15.00,
    quantity: "100kg",
    location: "Pune",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 103,
      name: "PaperCycle Co",
      rating: 4.2
    },
    dateAdded: new Date(2023, 6, 18)
  },
  {
    id: 4,
    title: "Glass Bottles",
    description: "Clear glass bottles, cleaned and sorted by color.",
    category: "Glass",
    price: 20.00,
    quantity: "30kg",
    location: "Chennai",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 104,
      name: "GlassWorks Recycling",
      rating: 4.6
    },
    dateAdded: new Date(2023, 6, 20)
  },
  {
    id: 5,
    title: "Wood Pallets",
    description: "Used wooden shipping pallets in good condition.",
    category: "Wood",
    price: 120.00,
    quantity: "15 units",
    location: "Bangalore",
    isRecyclable: true,
    isAuction: true,
    seller: {
      id: 105,
      name: "WoodReuse Solutions",
      rating: 4.3
    },
    dateAdded: new Date(2023, 6, 25)
  },
  {
    id: 6,
    title: "E-waste Components",
    description: "Computer parts, circuit boards, and cables.",
    category: "Electronics",
    price: 200.00,
    quantity: "25kg",
    location: "Hyderabad",
    isRecyclable: true,
    isAuction: false,
    seller: {
      id: 106,
      name: "TechRecycle Inc",
      rating: 4.7
    },
    dateAdded: new Date(2023, 6, 28)
  }
];

export const useMaterialMarketplace = () => {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(mockMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters();
  };

  // Apply filters and search
  const applyFilters = () => {
    let filtered = [...materials];
    
    // Apply search query if exists
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredMaterials(filtered);
  };

  // Handle filtering and sorting
  const handleFilterSort = (
    selectedCategories: string[],
    priceRange: [number, number],
    locations: string[],
    sortOption: string
  ) => {
    let filtered = [...materials];
    
    // Apply search query if exists
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(m => selectedCategories.includes(m.category));
    }
    
    // Apply price range
    filtered = filtered.filter(
      m => m.price >= priceRange[0] && m.price <= priceRange[1]
    );
    
    // Apply location filter
    if (locations.length > 0) {
      filtered = filtered.filter(m => 
        locations.some(loc => m.location.toLowerCase().includes(loc.toLowerCase()))
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        break;
      case "quantity":
        // This is just for demonstration as quantity is a string
        // In a real app, you might want to parse this to a number
        filtered.sort((a, b) => a.quantity.localeCompare(b.quantity));
        break;
      default:
        break;
    }
    
    setFilteredMaterials(filtered);
  };

  return {
    materials,
    filteredMaterials,
    isLoaded,
    handleSearch,
    handleFilterSort
  };
};
