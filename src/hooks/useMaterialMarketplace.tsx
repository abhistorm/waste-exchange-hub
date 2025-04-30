
import { useState, useEffect, useMemo } from 'react';
import { Material } from '@/types/material';
import { mockMaterials, auctionData } from '@/lib/mock-data';

export const useMaterialMarketplace = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Merge auctions with materials
  const materialsWithAuctions = useMemo(() => {
    return mockMaterials.map(material => {
      if (material.isAuction) {
        const auctionItem = auctionData.find(auction => auction.materialId === material.id);
        return { ...material, auction: auctionItem };
      }
      return material;
    });
  }, []);

  // Simulate loading state and fetch data
  useEffect(() => {
    const timer = setTimeout(() => {
      setMaterials(materialsWithAuctions);
      setFilteredMaterials(materialsWithAuctions);
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [materialsWithAuctions]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query);
  };

  // Apply filters and search
  const applyFilters = (query = searchQuery) => {
    let filtered = [...materials];
    
    // Apply search query if exists
    if (query) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase()) ||
        m.location.toLowerCase().includes(query.toLowerCase())
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
        m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase())
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
        filtered.sort((a, b) => a.quantity.localeCompare(b.quantity));
        break;
      default:
        filtered.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        break;
    }
    
    setFilteredMaterials(filtered);
  };

  // Handle adding a new material
  const handleAddMaterial = (material: Material) => {
    // In a real app, this would send data to an API
    // Here we're just updating the local state
    const newMaterial = {
      ...material,
      id: materials.length + 1,
      dateAdded: new Date(),
      views: 0
    };
    
    setMaterials(prev => [newMaterial, ...prev]);
    setFilteredMaterials(prev => [newMaterial, ...prev]);
    
    return newMaterial;
  };

  return {
    materials,
    filteredMaterials,
    isLoaded,
    handleSearch,
    handleFilterSort,
    handleAddMaterial
  };
};
