
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, Search, TrendingUp, 
  DollarSign, Recycle, Scale, AlertCircle 
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

// Mock data for scrap materials
const scrapMaterials = [
  { id: 1, name: 'Aluminium', rate: '₹110 - ₹120/kg', trend: 'up' },
  { id: 2, name: 'Copper', rate: '₹450 - ₹480/kg', trend: 'up' },
  { id: 3, name: 'Iron', rate: '₹25 - ₹30/kg', trend: 'down' },
  { id: 4, name: 'Brass', rate: '₹280 - ₹300/kg', trend: 'stable' },
  { id: 5, name: 'Steel', rate: '₹35 - ₹42/kg', trend: 'up' },
  { id: 6, name: 'Plastic', rate: '₹20 - ₹25/kg', trend: 'down' },
  { id: 7, name: 'Paper', rate: '₹12 - ₹15/kg', trend: 'stable' },
  { id: 8, name: 'E-waste', rate: '₹200 - ₹500/kg', trend: 'up' },
];

// Cities with service
const serviceCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const LocalRates = () => {
  const [location, setLocation] = useState('');
  const [showRates, setShowRates] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [serviceAvailable, setServiceAvailable] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Check if entered location is in our service cities list
      const isAvailable = serviceCities.some(
        city => city.toLowerCase() === location.toLowerCase()
      );
      
      setServiceAvailable(isAvailable);
      setShowRates(isAvailable);
      setIsSearching(false);
      
      if (isAvailable) {
        toast.success("Location found!", {
          description: `Showing current scrap rates for ${location}`,
        });
      } else {
        toast.error("Service not available", {
          description: "We currently don't operate in this location",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Check Current Scrap Rates in Your Area
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Get real-time market rates for all types of scrap materials. Enter your location to see current buying rates.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
              <div className="flex items-center gap-2">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your city"
                    className="pl-10 pr-4 py-6"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSearching} className="py-6">
                  {isSearching ? "Searching..." : "Check Rates"}
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Service not available alert */}
        {!serviceAvailable && !isSearching && location && (
          <div className="container mx-auto px-4 my-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Service Unavailable</AlertTitle>
              <AlertDescription>
                We currently don't service {location}. We're expanding quickly! 
                Please check back later or try a different location.
              </AlertDescription>
            </Alert>
            
            <div className="mt-6 text-center">
              <h3 className="text-lg font-medium mb-3">Cities where we currently operate:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {serviceCities.map((city) => (
                  <span 
                    key={city} 
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 
                      px-3 py-1 rounded-full text-sm"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Rates table */}
        {showRates && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Current Scrap Rates in {location}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Last updated: {new Date().toLocaleDateString()} 
                  <span className="text-sm ml-1">
                    (Rates are subject to change based on market conditions)
                  </span>
                </p>
              </div>
              
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Material</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scrapMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>{material.rate}</TableCell>
                        <TableCell>
                          {material.trend === 'up' && (
                            <span className="flex items-center text-green-600">
                              <TrendingUp className="h-4 w-4 mr-1" /> Rising
                            </span>
                          )}
                          {material.trend === 'down' && (
                            <span className="flex items-center text-red-600">
                              <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" /> Falling
                            </span>
                          )}
                          {material.trend === 'stable' && (
                            <span className="flex items-center text-blue-600">
                              <Scale className="h-4 w-4 mr-1" /> Stable
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => toast.success("Request sent!", {
                    description: "We'll contact you shortly to schedule a pickup",
                  })}
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  Request Pickup for Best Rates
                </Button>
              </div>
            </div>
          </section>
        )}
        
        {/* Benefits section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Why Choose WasteExchange for Scrap?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Best Market Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    We offer the highest rates in the market for all types of scrap materials, 
                    ensuring you get the best value for your materials.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Recycle className="h-5 w-5 mr-2 text-green-600" />
                    Eco-Friendly Disposal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    We ensure 100% environmentally friendly recycling process, 
                    minimizing waste and maximizing resource recovery.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-600" />
                    Free Doorstep Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our team will come to your location for free pickup, making the 
                    selling process completely hassle-free for you.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How are scrap rates determined?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Scrap rates are determined based on current market conditions, material quality, 
                    global commodity prices, and local demand. Our AI algorithms analyze these factors 
                    to provide you with the most competitive rates in real-time.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I sell my scrap?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Simply enter your location above, check the current rates, and request a pickup. 
                    Our team will contact you to schedule a convenient time, arrive at your location, 
                    weigh the materials, and pay you on the spot.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What materials do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    We accept a wide range of materials including metals (iron, aluminum, copper, brass), 
                    paper, plastic, e-waste, and more. If you're unsure about any material, 
                    please contact our customer support for assistance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Sell Your Scrap Materials?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who have turned their scrap into cash. 
              Our AI-powered platform ensures you get the best rates in the market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  toast.info("Scroll to top to check rates in your area!");
                }}
              >
                Check Local Rates
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => toast.success("Download successful!", {
                  description: "Our app is now installing on your device",
                })}
              >
                Download Our App
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LocalRates;
