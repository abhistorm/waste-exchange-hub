
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recycle, Trees, Car, Leaf, PieChart, Share2 } from 'lucide-react';

const CarbonCalculator = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [plasticWeight, setPlasticWeight] = useState("");
  const [paperWeight, setPaperWeight] = useState("");
  const [metalWeight, setMetalWeight] = useState("");
  const [electronicsWeight, setElectronicsWeight] = useState("");
  const [glassWeight, setGlassWeight] = useState("");
  const [calculationResult, setCalculationResult] = useState<null | {
    totalCO2Saved: number;
    treesEquivalent: number;
    carMilesEquivalent: number;
    energySaved: number;
  }>(null);

  // CO2 savings per kg in kg of CO2
  const CO2_FACTORS = {
    plastic: 2.5,
    paper: 1.1,
    metal: 4.2,
    electronics: 7.8,
    glass: 0.6
  };

  const calculateImpact = () => {
    const plasticImpact = (parseFloat(plasticWeight) || 0) * CO2_FACTORS.plastic;
    const paperImpact = (parseFloat(paperWeight) || 0) * CO2_FACTORS.paper;
    const metalImpact = (parseFloat(metalWeight) || 0) * CO2_FACTORS.metal;
    const electronicsImpact = (parseFloat(electronicsWeight) || 0) * CO2_FACTORS.electronics;
    const glassImpact = (parseFloat(glassWeight) || 0) * CO2_FACTORS.glass;
    
    const totalCO2Saved = plasticImpact + paperImpact + metalImpact + electronicsImpact + glassImpact;
    
    // Conversion factors
    const treesEquivalent = totalCO2Saved / 21; // One tree absorbs ~21kg CO2 per year
    const carMilesEquivalent = totalCO2Saved / 0.4; // Average car emits ~400g CO2 per mile
    const energySaved = totalCO2Saved * 3.7; // kWh per kg of CO2 (estimated)
    
    setCalculationResult({
      totalCO2Saved,
      treesEquivalent,
      carMilesEquivalent,
      energySaved
    });
  };

  const resetCalculator = () => {
    setPlasticWeight("");
    setPaperWeight("");
    setMetalWeight("");
    setElectronicsWeight("");
    setGlassWeight("");
    setCalculationResult(null);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Carbon Savings Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              Calculate the environmental impact of your recycling efforts and see how you're helping the planet
            </p>
            
            <Tabs defaultValue="calculator" className="mb-10">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calculator" className="flex items-center gap-2">
                  <Recycle className="h-4 w-4" />
                  Calculator
                </TabsTrigger>
                <TabsTrigger value="results" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Impact Results
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator">
                <Card>
                  <CardHeader>
                    <CardTitle>Carbon Footprint Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="plasticWeight">Plastic (kg)</Label>
                          <Input 
                            id="plasticWeight" 
                            type="number" 
                            placeholder="Enter weight" 
                            value={plasticWeight}
                            onChange={(e) => setPlasticWeight(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="paperWeight">Paper & Cardboard (kg)</Label>
                          <Input 
                            id="paperWeight" 
                            type="number" 
                            placeholder="Enter weight" 
                            value={paperWeight}
                            onChange={(e) => setPaperWeight(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="metalWeight">Metal (kg)</Label>
                          <Input 
                            id="metalWeight" 
                            type="number" 
                            placeholder="Enter weight" 
                            value={metalWeight}
                            onChange={(e) => setMetalWeight(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="electronicsWeight">Electronics (kg)</Label>
                          <Input 
                            id="electronicsWeight" 
                            type="number" 
                            placeholder="Enter weight" 
                            value={electronicsWeight}
                            onChange={(e) => setElectronicsWeight(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="glassWeight">Glass (kg)</Label>
                          <Input 
                            id="glassWeight" 
                            type="number" 
                            placeholder="Enter weight" 
                            value={glassWeight}
                            onChange={(e) => setGlassWeight(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-3 flex gap-3">
                        <Button 
                          type="button" 
                          onClick={calculateImpact}
                          className="flex-1"
                        >
                          Calculate Impact
                        </Button>
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={resetCalculator}
                        >
                          Reset
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!calculationResult ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                        <Leaf className="h-16 w-16 mb-4 opacity-20" />
                        <p className="mb-2">No calculations yet</p>
                        <p className="text-sm">Enter material weights and calculate to see your impact</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 text-center">
                          <h3 className="text-lg font-medium mb-1">Total CO₂ Saved</h3>
                          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                            {calculationResult.totalCO2Saved.toFixed(2)} kg
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                            <div className="mb-2">
                              <Trees className="h-8 w-8 mx-auto text-emerald-500" />
                            </div>
                            <h4 className="text-sm font-medium mb-1">Equivalent to</h4>
                            <p className="text-lg font-semibold">
                              {calculationResult.treesEquivalent.toFixed(1)} trees
                            </p>
                            <p className="text-xs text-gray-500">
                              Absorbing CO₂ for one year
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                            <div className="mb-2">
                              <Car className="h-8 w-8 mx-auto text-indigo-500" />
                            </div>
                            <h4 className="text-sm font-medium mb-1">Equivalent to</h4>
                            <p className="text-lg font-semibold">
                              {calculationResult.carMilesEquivalent.toFixed(1)} miles
                            </p>
                            <p className="text-xs text-gray-500">
                              Not driven in a car
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                            <div className="mb-2">
                              <Leaf className="h-8 w-8 mx-auto text-amber-500" />
                            </div>
                            <h4 className="text-sm font-medium mb-1">Energy Saved</h4>
                            <p className="text-lg font-semibold">
                              {calculationResult.energySaved.toFixed(1)} kWh
                            </p>
                            <p className="text-xs text-gray-500">
                              Of electricity production
                            </p>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex justify-center">
                          <Button variant="outline" disabled className="flex items-center gap-2">
                            <Share2 className="h-4 w-4" />
                            Share Results (Coming Soon)
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Why Recycling Matters</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Conserves Resources</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recycling reduces the need for raw materials and preserves natural resources.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Saves Energy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manufacturing from recycled materials uses less energy than from raw materials.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Reduces Landfill Waste</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recycling diverts materials from landfills, reducing pollution and emissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarbonCalculator;
