import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import ProductGrid from '@/components/store/ProductGrid';
import StoreFilters from '@/components/store/StoreFilters';
import { Product } from '@/types/store';
import ListProductModal from '@/components/store/ListProductModal';
import StoreHeader from '@/components/store/StoreHeader';
import { Plus, ShoppingBag } from 'lucide-react';

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Recycled Glass Vase",
    description: "Hand-blown vase made from reclaimed wine bottles, each with a unique pattern.",
    price: 45.00,
    category: "Home Decor",
    image: "/placeholder.svg",
    seller: "EcoGlass Studio",
    materials: ["Recycled Glass"],
    inStock: true,
    rating: 4.5,
    dateAdded: new Date(2023, 5, 15),
    sustainability: {
      percentRecycled: 100,
      carbonSaved: 2.3,
      wasteDiverted: "1.2kg"
    }
  },
  {
    id: 2,
    name: "Pallet Wood Coffee Table",
    description: "Sturdy coffee table handcrafted from reclaimed shipping pallets with a natural finish.",
    price: 199.00,
    category: "Furniture",
    image: "/placeholder.svg",
    seller: "Urban Reclaim Furniture",
    materials: ["Reclaimed Wood"],
    inStock: true,
    rating: 4.8,
    dateAdded: new Date(2023, 4, 22),
    sustainability: {
      percentRecycled: 100,
      carbonSaved: 15.7,
      wasteDiverted: "12kg"
    }
  },
  {
    id: 3,
    name: "Tire Planter Set",
    description: "Set of 3 colorful garden planters made from upcycled tires, weather-resistant and durable.",
    price: 35.00,
    category: "Garden",
    image: "/placeholder.svg",
    seller: "GreenCycle Designs",
    materials: ["Rubber", "Reclaimed Paint"],
    inStock: true,
    rating: 4.2,
    dateAdded: new Date(2023, 6, 5),
    sustainability: {
      percentRecycled: 95,
      carbonSaved: 4.1,
      wasteDiverted: "8kg"
    }
  },
  {
    id: 4,
    name: "Circuit Board Wall Art",
    description: "Unique wall art created from salvaged circuit boards and electronic components.",
    price: 75.00,
    category: "Home Decor",
    image: "/placeholder.svg",
    seller: "TechTrash Treasures",
    materials: ["Electronic Waste"],
    inStock: true,
    rating: 4.4,
    dateAdded: new Date(2023, 3, 18),
    sustainability: {
      percentRecycled: 100,
      carbonSaved: 3.2,
      wasteDiverted: "1.5kg"
    }
  },
  {
    id: 5,
    name: "Plastic Bottle Lampshade",
    description: "Modern pendant lampshade crafted from cleaned and processed plastic bottles.",
    price: 65.00,
    category: "Lighting",
    image: "/placeholder.svg",
    seller: "LuminaryWaste",
    materials: ["PET Plastic"],
    inStock: true,
    rating: 4.6,
    dateAdded: new Date(2023, 7, 2),
    sustainability: {
      percentRecycled: 100,
      carbonSaved: 1.8,
      wasteDiverted: "0.9kg"
    }
  },
  {
    id: 6,
    name: "Newspaper Basket Set",
    description: "Set of 3 handwoven baskets made from rolled newspapers, perfect for storage.",
    price: 28.50,
    category: "Home Decor",
    image: "/placeholder.svg",
    seller: "PaperCraft Collective",
    materials: ["Recycled Newspaper"],
    inStock: true,
    rating: 4.3,
    dateAdded: new Date(2023, 5, 28),
    sustainability: {
      percentRecycled: 100,
      carbonSaved: 1.1,
      wasteDiverted: "3kg"
    }
  },
  {
    id: 7,
    name: "Bottle Cap Mosaic Frame",
    description: "Colorful picture frame decorated with a mosaic of collected bottle caps.",
    price: 32.00,
    category: "Home Decor",
    image: "/placeholder.svg",
    seller: "CapArt Studio",
    materials: ["Metal Bottle Caps", "Reclaimed Wood"],
    inStock: true,
    rating: 4.0,
    dateAdded: new Date(2023, 4, 12),
    sustainability: {
      percentRecycled: 100,
      carbonSaved: 0.7,
      wasteDiverted: "0.5kg"
    }
  },
  {
    id: 8,
    name: "Denim Patchwork Cushion",
    description: "Soft cushion cover made from repurposed denim jeans in various shades of blue.",
    price: 24.99,
    category: "Home Decor",
    image: "/placeholder.svg",
    seller: "SecondDenim Designs",
    materials: ["Recycled Denim"],
    inStock: true,
    rating: 4.7,
    dateAdded: new Date(2023, 6, 20),
    sustainability: {
      percentRecycled: 100,
      carbonSaved: 1.3,
      wasteDiverted: "0.8kg"
    }
  }
];

const Store = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract unique categories and materials for filters
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    const uniqueMaterials = Array.from(
      new Set(products.flatMap(p => p.materials))
    );
    
    setCategories(uniqueCategories);
    setMaterials(uniqueMaterials);
    
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [products]);

  // Handle filtering and sorting
  const handleFilterSort = (
    selectedCategories: string[],
    selectedMaterials: string[],
    priceRange: [number, number],
    sortOption: string
  ) => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Apply materials filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(p => 
        p.materials.some(m => selectedMaterials.includes(m))
      );
    }
    
    // Apply price range
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        break;
      case "sustainability":
        filtered.sort((a, b) => b.sustainability.carbonSaved - a.sustainability.carbonSaved);
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
  };

  const handleProductAdded = (newProduct: Product) => {
    const updatedProducts = [...products, {
      ...newProduct,
      id: products.length + 1,
      dateAdded: new Date(),
      rating: 0
    }];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setIsListModalOpen(false);
  };

  const pageClass = isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0";

  return (
    <div className={pageClass}>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero section with cart */}
        <StoreHeader onOpenListModal={() => setIsListModalOpen(true)} />
        
        {/* Main store section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="lg:w-1/4">
                <StoreFilters 
                  categories={categories}
                  materials={materials}
                  onFilterSort={handleFilterSort}
                />
              </div>
              
              {/* Products grid */}
              <div className="lg:w-3/4">
                <ProductGrid products={filteredProducts} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* List product modal */}
      <ListProductModal 
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onProductAdded={handleProductAdded}
        materials={materials}
        categories={categories}
      />
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Store;
