
import React, { useState, useEffect } from 'react';
import MaterialCard from './MaterialCard';
import { Search, Filter, ArrowRight } from 'lucide-react';

// Sample materials data
const materialData = [
  {
    id: 1,
    title: "Metal Scraps - Aluminum",
    category: "Metals",
    description: "High-quality aluminum scraps from manufacturing process. Clean and sorted by type.",
    price: 1.20,
    quantity: "2 tons available",
    location: "Chicago, IL",
    isRecyclable: true,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  {
    id: 2,
    title: "Wood Pallets - Untreated",
    category: "Wood",
    description: "Standard size untreated wood pallets in good condition. Perfect for upcycling projects.",
    price: 8.50,
    quantity: "75 units",
    location: "Denver, CO",
    isRecyclable: true,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 3,
    title: "Plastic Resin - HDPE",
    category: "Plastics",
    description: "Post-industrial HDPE plastic resin, clean and ready for reprocessing.",
    price: 0.75,
    quantity: "1.5 tons available",
    location: "Atlanta, GA",
    isRecyclable: true,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
  },
  {
    id: 4,
    title: "Textile Offcuts - Cotton",
    category: "Textiles",
    description: "Cotton fabric scraps from garment manufacturing. Various colors and sizes.",
    price: 2.15,
    quantity: "500 lbs available",
    location: "Los Angeles, CA",
    isRecyclable: true,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  {
    id: 5,
    title: "E-Waste - Circuit Boards",
    category: "Electronics",
    description: "Used circuit boards from electronic devices. Contains valuable materials.",
    price: 3.80,
    quantity: "200 lbs available",
    location: "Boston, MA",
    isRecyclable: true,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
  },
  {
    id: 6,
    title: "Glass Cullet - Mixed Colors",
    category: "Glass",
    description: "Mixed color glass cullet suitable for recycling or artistic projects.",
    price: 0.15,
    quantity: "3 tons available",
    location: "Seattle, WA",
    isRecyclable: true,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  }
];

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
  "Chemicals"
];

const MarketplaceSection = () => {
  const [materials, setMaterials] = useState(materialData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter materials based on search and category
  useEffect(() => {
    let filtered = materialData;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(material => material.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(material => 
        material.title.toLowerCase().includes(query) || 
        material.description.toLowerCase().includes(query)
      );
    }
    
    setMaterials(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <section id="marketplace" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 mb-4 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            Browse Materials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Waste Material Marketplace</h2>
          <p className="text-gray-600">
            Discover available industrial waste materials ready for repurposing, recycling, or reuse.
          </p>
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
          </div>
        </div>
        
        {/* Materials Grid */}
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
                  setSearchQuery("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        
        {/* View More Button */}
        {materials.length > 0 && (
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors group">
              View All Materials
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketplaceSection;
