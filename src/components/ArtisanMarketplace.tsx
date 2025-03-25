
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, ShoppingBag, Leaf } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ArtisanWorkshopForm from './artisan/ArtisanWorkshopForm';
import { useCart } from '@/contexts/CartContext';

interface ArtisanProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  artisan: string;
  materials: string;
  description: string;
}

const products: ArtisanProduct[] = [
  {
    id: 1,
    title: "Recycled Glass Vase",
    image: "/placeholder.svg",
    price: 45,
    artisan: "EcoGlass Studio",
    materials: "Repurposed wine bottles",
    description: "Hand-blown vase made from reclaimed wine bottles, each with a unique pattern."
  },
  {
    id: 2,
    title: "Pallet Wood Coffee Table",
    image: "/placeholder.svg",
    price: 199,
    artisan: "Urban Reclaim Furniture",
    materials: "Upcycled shipping pallets",
    description: "Sturdy coffee table handcrafted from reclaimed shipping pallets with a natural finish."
  },
  {
    id: 3,
    title: "Tire Planter Set",
    image: "/placeholder.svg",
    price: 35,
    artisan: "GreenCycle Designs",
    materials: "Repurposed automotive tires",
    description: "Set of 3 colorful garden planters made from upcycled tires, weather-resistant and durable."
  },
  {
    id: 4,
    title: "Circuit Board Wall Art",
    image: "/placeholder.svg",
    price: 75,
    artisan: "TechTrash Treasures",
    materials: "Discarded computer parts",
    description: "Unique wall art created from salvaged circuit boards and electronic components."
  },
  {
    id: 5,
    title: "Plastic Bottle Lampshade",
    image: "/placeholder.svg",
    price: 65,
    artisan: "LuminaryWaste",
    materials: "Upcycled PET bottles",
    description: "Modern pendant lampshade crafted from cleaned and processed plastic bottles."
  }
];

const ArtisanMarketplace = () => {
  const { addToCart } = useCart();
  
  // Create a product object from ArtisanProduct to add to cart
  const handleAddToCart = (product: ArtisanProduct) => {
    const cartProduct = {
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      category: "Artisan Craft",
      image: product.image,
      seller: product.artisan,
      materials: [product.materials],
      inStock: true,
      rating: 4.5,
      dateAdded: new Date(),
      sustainability: {
        percentRecycled: 100,
        carbonSaved: 2.5,
        wasteDiverted: "1kg"
      }
    };
    
    addToCart(cartProduct);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Artisan Marketplace</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover unique handcrafted products made from recycled materials. 
            Support local artisans while promoting sustainable consumption.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <Recycle className="h-5 w-5 text-emerald-500" />
              <span>100% Recycled Materials</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <ShoppingBag className="h-5 w-5 text-emerald-500" />
              <span>Support Local Artisans</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <Leaf className="h-5 w-5 text-emerald-500" />
              <span>Eco-Friendly Products</span>
            </div>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-screen-xl mx-auto"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="h-48 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-4">
                      <CardTitle>{product.title}</CardTitle>
                      <CardDescription className="flex justify-between mt-1">
                        <span className="font-medium">₹{product.price}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{product.artisan}</span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span className="font-medium">Materials:</span> {product.materials}
                    </div>
                    <p className="text-sm">{product.description}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static mr-2 translate-y-0" />
            <CarouselNext className="relative static ml-2 translate-y-0" />
          </div>
        </Carousel>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-6">Are you an artisan creating products from waste materials?</h3>
          <ArtisanWorkshopForm />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            We provide a platform for skilled craftspeople to showcase and sell their upcycled creations, 
            helping to reduce waste while supporting sustainable livelihoods.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArtisanMarketplace;
