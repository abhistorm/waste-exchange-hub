
import React, { useState } from 'react';
import { Leaf, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

// Default carbon impact factors (kg CO2e per kg of material)
const CARBON_FACTORS = {
  'Metals': {
    'Aluminum': 8.24,
    'Steel': 1.46,
    'Copper': 2.80,
    'Other': 2.0
  },
  'Plastics': {
    'HDPE': 1.90,
    'PET': 2.73,
    'PVC': 3.10,
    'Other': 2.5
  },
  'Glass': 0.85,
  'Paper': 1.1,
  'Wood': 0.46,
  'Textiles': 3.4,
  'Electronics': 20.0,
  'Chemicals': 4.0,
  'Other': 2.0
};

interface FormValues {
  materialCategory: string;
  materialType: string;
  weight: number;
  transportDistance: number;
}

const CarbonCalculator = () => {
  const [results, setResults] = useState<{
    carbonSaved: number;
    treesEquivalent: number;
    carMilesEquivalent: number;
  } | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      materialCategory: '',
      materialType: '',
      weight: 100,
      transportDistance: 50,
    },
  });
  
  const materialCategory = form.watch('materialCategory');
  
  // Get material types based on selected category
  const getMaterialTypes = () => {
    if (!materialCategory || materialCategory === 'Glass' || 
        materialCategory === 'Paper' || materialCategory === 'Wood' || 
        materialCategory === 'Textiles' || materialCategory === 'Electronics' || 
        materialCategory === 'Chemicals' || materialCategory === 'Other') {
      return [];
    }
    
    return Object.keys(CARBON_FACTORS[materialCategory as keyof typeof CARBON_FACTORS] as Record<string, number>);
  };
  
  const materialTypes = getMaterialTypes();
  
  const calculateCarbonSavings = (data: FormValues) => {
    // Get carbon factor based on material category and type
    let carbonFactor: number;
    
    if (data.materialCategory === 'Metals' || data.materialCategory === 'Plastics') {
      const typeFactors = CARBON_FACTORS[data.materialCategory] as Record<string, number>;
      carbonFactor = typeFactors[data.materialType] || typeFactors['Other'];
    } else {
      carbonFactor = CARBON_FACTORS[data.materialCategory as keyof typeof CARBON_FACTORS] as number || CARBON_FACTORS['Other'];
    }
    
    // Calculate carbon savings (kg CO2e)
    // Formula: Material weight * carbon factor - transport emissions
    const transportEmissions = (data.transportDistance / 100) * 0.1; // Simplified transport emissions calculation
    const carbonSaved = (data.weight * carbonFactor) - transportEmissions;
    
    // Calculate equivalents
    // 1 tree absorbs ~22kg CO2 per year
    const treesEquivalent = carbonSaved / 22;
    
    // 1 car mile produces ~0.4kg CO2
    const carMilesEquivalent = carbonSaved / 0.4;
    
    setResults({
      carbonSaved: Math.max(0, carbonSaved),
      treesEquivalent: Math.max(0, treesEquivalent),
      carMilesEquivalent: Math.max(0, carMilesEquivalent)
    });
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Leaf className="h-4 w-4" />
          Calculate Carbon Impact
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Carbon Savings Calculator</SheetTitle>
          <SheetDescription>
            Estimate the environmental impact of recycling waste materials
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(calculateCarbonSavings)} className="space-y-6">
              <FormField
                control={form.control}
                name="materialCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(CARBON_FACTORS).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the primary material category
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              {materialTypes.length > 0 && (
                <FormField
                  control={form.control}
                  name="materialType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select material type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {materialTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.1" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Estimated weight of materials being recycled
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="transportDistance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transport Distance (km)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Estimated distance for transporting the materials
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                Calculate Impact
              </Button>
            </form>
          </Form>
          
          {results && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 mb-2 flex items-center">
                <Leaf className="mr-2 h-5 w-5" />
                Environmental Impact
              </h4>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">CO₂ Emissions Saved</div>
                  <div className="text-xl font-bold text-green-700">{results.carbonSaved.toFixed(2)} kg CO₂e</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Equivalent to</div>
                    <div className="text-lg font-bold text-green-700">{Math.round(results.treesEquivalent)} trees</div>
                    <div className="text-xs text-gray-500">for one year</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500">Or equivalent to</div>
                    <div className="text-lg font-bold text-green-700">{Math.round(results.carMilesEquivalent)} miles</div>
                    <div className="text-xs text-gray-500">not driven by car</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CarbonCalculator;
