import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Tag, Trash, DollarSign, MapPin } from "lucide-react";

// Material categories - match with mock data
const categories = [
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

interface MaterialFiltersProps {
  onSearch: (query: string) => void;
  onFilterSort: (
    categories: string[],
    priceRange: [number, number],
    locations: string[],
    sortOption: string
  ) => void;
}

const MaterialFilters = ({ onSearch, onFilterSort }: MaterialFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [locations, setLocations] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [sortOption, setSortOption] = useState("newest");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, minPrice, maxPrice, locations, sortOption]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const applyFilters = () => {
    onFilterSort(
      selectedCategories,
      [minPrice, maxPrice],
      locations,
      sortOption
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const addLocation = () => {
    if (location && !locations.includes(location)) {
      setLocations(prev => [...prev, location]);
      setLocation('');
    }
  };

  const removeLocation = (loc: string) => {
    setLocations(prev => prev.filter(l => l !== loc));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setLocations([]);
    setSortOption("newest");
    onSearch('');
  };

  return (
    <>
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute right-0 top-0" 
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters & Sort
          </span>
          <span>{isExpanded ? "Hide" : "Show"}</span>
        </Button>
      </div>
      
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block space-y-6`}>
        {/* Sort options */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              Sort By
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="quantity">Most Available</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Category filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              Material Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label 
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price range */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Price Range (₹)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(Number(e.target.value))}
                  min={0}
                  max={maxPrice}
                  placeholder="Min"
                  className="w-full"
                />
                <span className="text-sm text-gray-500">to</span>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  min={minPrice}
                  placeholder="Max"
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Add location..."
                  className="w-full"
                />
                <Button size="sm" onClick={addLocation}>Add</Button>
              </div>
              
              {locations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {locations.map(loc => (
                    <div 
                      key={loc} 
                      className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      <span className="text-sm">{loc}</span>
                      <button 
                        onClick={() => removeLocation(loc)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reset filters */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={resetFilters}
        >
          Reset All Filters
        </Button>
      </div>
    </>
  );
};

export default MaterialFilters;
