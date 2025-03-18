
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SlidersHorizontal, Tag, Flower, DollarSign, ArrowUpDown } from "lucide-react";

interface StoreFiltersProps {
  categories: string[];
  materials: string[];
  onFilterSort: (
    categories: string[],
    materials: string[],
    priceRange: [number, number],
    sortOption: string
  ) => void;
}

const StoreFilters = ({ categories, materials, onFilterSort }: StoreFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortOption, setSortOption] = useState("newest");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedMaterials, minPrice, maxPrice, sortOption]);

  const applyFilters = () => {
    onFilterSort(
      selectedCategories,
      selectedMaterials,
      [minPrice, maxPrice],
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

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setMinPrice(0);
    setMaxPrice(500);
    setSortOption("newest");
  };

  return (
    <>
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
              <ArrowUpDown className="mr-2 h-4 w-4" />
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
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="sustainability">Most Sustainable</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Category filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              Categories
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

        {/* Materials filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Flower className="mr-2 h-4 w-4" />
              Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {materials.map(material => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`material-${material}`}
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={() => handleMaterialChange(material)}
                  />
                  <Label 
                    htmlFor={`material-${material}`}
                    className="text-sm cursor-pointer"
                  >
                    {material}
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
              Price Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">$</span>
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

export default StoreFilters;
