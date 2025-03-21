import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, Search, TrendingUp, 
  DollarSign, Recycle, Scale, AlertCircle,
  Newspaper, ShoppingBag, Wine, FileText, BookOpen,
  Package, Trash2, Construction, UtensilsCrossed, PanelTop,
  Nfc, Wrench, Tv, Airplay, Minimize2, WashingMachine, 
  Droplets, Snowflake, Fan, Printer, MonitorSmartphone, Smartphone,
  MonitorOff, Monitor, Cpu, Bike, Car
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

// Updated scrap materials with rates provided
const scrapMaterials = [
  // Normal Recyclables
  { id: 1, category: 'Normal Recyclables', name: 'Newspaper', rate: '₹14/kg', note: 'Market Rates Dropped Recently', icon: <Newspaper className="h-4 w-4" /> },
  { id: 2, category: 'Normal Recyclables', name: 'Clothes', rate: '₹2/kg', note: 'Accepted only when given with other scrap items (We don\'t accept undergarments)', icon: <ShoppingBag className="h-4 w-4" /> },
  { id: 3, category: 'Normal Recyclables', name: 'Glass bottles', rate: '₹2/kg', note: 'Accepted only when given with other scrap items', icon: <Wine className="h-4 w-4" /> },
  { id: 4, category: 'Normal Recyclables', name: 'Office Paper (A3/A4)', rate: '₹14/kg', note: '', icon: <FileText className="h-4 w-4" /> },
  { id: 5, category: 'Normal Recyclables', name: 'Copies/Books', rate: '₹12/kg', note: '', icon: <BookOpen className="h-4 w-4" /> },
  { id: 6, category: 'Normal Recyclables', name: 'Cardboard', rate: '₹8/kg', note: 'To get quote for bulk qty. call at +91-8595358613', icon: <Package className="h-4 w-4" /> },
  { id: 7, category: 'Normal Recyclables', name: 'PET Bottles/ Other Plastic', rate: '₹8/kg', note: '', icon: <Trash2 className="h-4 w-4" /> },
  { id: 8, category: 'Normal Recyclables', name: 'Iron', rate: '₹26/kg', note: 'To get quote for bulk qty. call at +91-8595358613', icon: <Construction className="h-4 w-4" /> },
  { id: 9, category: 'Normal Recyclables', name: 'Steel Utensils', rate: '₹40/kg', note: '', icon: <UtensilsCrossed className="h-4 w-4" /> },
  { id: 10, category: 'Normal Recyclables', name: 'Aluminium', rate: '₹105/kg', note: '', icon: <PanelTop className="h-4 w-4" /> },
  { id: 11, category: 'Normal Recyclables', name: 'Brass', rate: '₹305/kg', note: '', icon: <Nfc className="h-4 w-4" /> },
  { id: 12, category: 'Normal Recyclables', name: 'Copper', rate: '₹425/kg', note: '', icon: <Wrench className="h-4 w-4" /> },
  
  // Large Appliances
  { id: 13, category: 'Large Appliances', name: 'Split AC Copper Coil 1.5 Ton (Indoor + Outdoor)', rate: '₹4150/piece', note: '', icon: <Airplay className="h-4 w-4" /> },
  { id: 14, category: 'Large Appliances', name: 'Window AC 1.5 Ton (Copper Coil)', rate: '₹4050/piece', note: '', icon: <Minimize2 className="h-4 w-4" /> },
  { id: 15, category: 'Large Appliances', name: 'SPLIT/WINDOW AC 1 Ton (Copper Coil)', rate: '₹3000/piece', note: '', icon: <Airplay className="h-4 w-4" /> },
  { id: 16, category: 'Large Appliances', name: 'Front Load Fully Automatic Washing Machine', rate: '₹1350/piece', note: '', icon: <WashingMachine className="h-4 w-4" /> },
  { id: 17, category: 'Large Appliances', name: 'WINDOW/SPLIT AC 2 Ton (Copper Coil)', rate: '₹5600/piece', note: '', icon: <Airplay className="h-4 w-4" /> },
  { id: 18, category: 'Large Appliances', name: 'Top Load Fully Automatic Washing Machine', rate: '₹1000/piece', note: '', icon: <WashingMachine className="h-4 w-4" /> },
  { id: 19, category: 'Large Appliances', name: 'Semi Automatic Washing Machine (Double Drum)', rate: '₹750/piece', note: '', icon: <WashingMachine className="h-4 w-4" /> },
  { id: 20, category: 'Large Appliances', name: 'Geyser', rate: '₹20/kg', note: '', icon: <Droplets className="h-4 w-4" /> },
  { id: 21, category: 'Large Appliances', name: 'Single Door Fridge', rate: '₹1100/piece', note: '', icon: <Snowflake className="h-4 w-4" /> },
  { id: 22, category: 'Large Appliances', name: 'Double Door Fridge', rate: '₹1350/piece', note: '', icon: <Snowflake className="h-4 w-4" /> },
  { id: 23, category: 'Large Appliances', name: 'Iron Cooler', rate: '₹30/kg', note: '', icon: <Fan className="h-4 w-4" /> },
  { id: 24, category: 'Large Appliances', name: 'Plastic cooler', rate: '₹15/kg', note: '', icon: <Fan className="h-4 w-4" /> },
  
  // Small Appliances
  { id: 25, category: 'Small Appliances', name: 'Printer/scanner/fax machine', rate: '₹20/kg', note: '', icon: <Printer className="h-4 w-4" /> },
  { id: 26, category: 'Small Appliances', name: 'Metal E-waste', rate: '₹28/kg', note: '', icon: <MonitorSmartphone className="h-4 w-4" /> },
  { id: 27, category: 'Small Appliances', name: 'Plastic E-waste', rate: '₹15/kg', note: '', icon: <MonitorSmartphone className="h-4 w-4" /> },
  { id: 28, category: 'Small Appliances', name: 'CRT TV', rate: '₹200/piece', note: '', icon: <Tv className="h-4 w-4" /> },
  { id: 29, category: 'Small Appliances', name: 'Ceiling Fan', rate: '₹35/Kg', note: '', icon: <Fan className="h-4 w-4" /> },
  { id: 30, category: 'Small Appliances', name: 'Motors (Copper wiring)', rate: '₹35/kg', note: '', icon: <Fan className="h-4 w-4" /> },
  { id: 31, category: 'Small Appliances', name: 'Microwave', rate: '₹350/piece', note: '', icon: <Tv className="h-4 w-4" /> },
  { id: 32, category: 'Small Appliances', name: 'UPS', rate: '₹180/piece', note: '', icon: <Tv className="h-4 w-4" /> },
  { id: 33, category: 'Small Appliances', name: 'Inverter/Stabilizer (Copper Coil)', rate: '₹40/Kg', note: '', icon: <Tv className="h-4 w-4" /> },
  { id: 34, category: 'Small Appliances', name: 'Battery(used with inverters)', rate: '₹81/kg', note: '', icon: <Tv className="h-4 w-4" /> },
  
  // Mobiles & Computers
  { id: 35, category: 'Mobiles & Computers', name: 'Scrap Laptop', rate: '₹300/piece', note: '', icon: <Smartphone className="h-4 w-4" /> },
  { id: 36, category: 'Mobiles & Computers', name: 'CRT Monitor', rate: '₹150/piece', note: '', icon: <MonitorOff className="h-4 w-4" /> },
  { id: 37, category: 'Mobiles & Computers', name: 'LCD Monitor', rate: '₹20/Kg', note: '', icon: <Monitor className="h-4 w-4" /> },
  { id: 38, category: 'Mobiles & Computers', name: 'Computer CPU', rate: '₹225/piece', note: '', icon: <Cpu className="h-4 w-4" /> },
  
  // Others
  { id: 39, category: 'Others', name: 'Bike', rate: '₹2100/Piece', note: '', icon: <Bike className="h-4 w-4" /> },
  { id: 40, category: 'Others', name: 'Clothes', rate: '₹2/kg', note: 'Accepted only when given with other scrap items (We don\'t accept undergarments)', icon: <ShoppingBag className="h-4 w-4" /> },
  { id: 41, category: 'Others', name: 'Car', rate: '₹20000/piece', note: '', icon: <Car className="h-4 w-4" /> },
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
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...new Set(scrapMaterials.map(item => item.category))];
  
  const filteredMaterials = activeCategory === 'All' 
    ? scrapMaterials 
    : scrapMaterials.filter(item => item.category === activeCategory);

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
              
              {/* Category filter tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Material</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>{material.icon}</TableCell>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>{material.rate}</TableCell>
                        <TableCell className="text-sm text-gray-500">{material.note}</TableCell>
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
