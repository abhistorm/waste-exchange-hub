
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MaterialCard from './MaterialCard';
import { Search, Filter, ArrowRight, Tag, Gavel } from 'lucide-react';
import { Material } from '@/types/material';
import MaterialListingForm from './MaterialListingForm';
import { mockMaterials, auctionData } from '@/lib/mock-data';

// Material categories for filtering
const categories = [
  "All",
  "Metals",
  "Wood",
  "Plastics",
  "Textiles",
  "Electronics",
  "Glass",
  "Paper",
  "Chemicals",
  "Rubber"
];

// Listing types
const listingTypes = [
  "All Listings",
  "Buy Now",
  "Auctions"
];

const MarketplaceSection = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedListingType, setSelectedListingType] = useState("All Listings");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
  
  // Simulate API fetch on component mount
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setMaterials(materialsWithAuctions);
      setIsLoading(false);
    }, 800);
  }, [materialsWithAuctions]);
  
  // Filter materials based on search, category, and listing type
  useEffect(() => {
    let filtered = materialsWithAuctions;
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(material => material.category === selectedCategory);
    }
    
    // Filter by listing type
    if (selectedListingType === "Buy Now") {
      filtered = filtered.filter(material => !material.isAuction);
    } else if (selectedListingType === "Auctions") {
      filtered = filtered.filter(material => material.isAuction);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(material => 
        material.title.toLowerCase().includes(query) || 
        material.description.toLowerCase().includes(query) ||
        material.category.toLowerCase().includes(query) ||
        material.location.toLowerCase().includes(query)
      );
    }
    
    setMaterials(filtered);
  }, [selectedCategory, selectedListingType, searchQuery, materialsWithAuctions]);

  return (
    <section id="marketplace" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 mb-4 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            Browse Materials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Waste Material Marketplace</h2>
          <p className="text-gray-600 mb-6">
            Discover available industrial waste materials ready for repurposing, recycling, or reuse.
            List your own materials to reduce waste and promote a circular economy.
          </p>
          
          <div className="flex justify-center">
            <MaterialListingForm />
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search materials..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                  className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                  className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                  value={selectedListingType}
                  onChange={(e) => setSelectedListingType(e.target.value)}
                >
                  {listingTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Materials Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.length > 0 ? (
              materials.map((material, index) => (
                <MaterialCard key={material.id} material={material} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No materials found matching your criteria.</p>
                <button 
                  className="text-primary hover:underline flex items-center mx-auto"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedListingType("All Listings");
                    setSearchQuery("");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* View More Button */}
        {materials.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/material-marketplace" className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors group">
              View All Materials
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketplaceSection;
