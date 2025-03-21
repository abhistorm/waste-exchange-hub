
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Camera, Upload, Zap } from 'lucide-react';

const MaterialAnalyzer = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [materialType, setMaterialType] = useState("");
  const [weight, setWeight] = useState("");
  const [analysisResult, setAnalysisResult] = useState<null | {
    estimatedValue: string;
    co2Saved: string;
    recommendations: string[];
  }>(null);

  const handleAnalyze = () => {
    // This would typically be an API call to an AI service
    // For demonstration, we'll use mock data
    
    const mockResults = {
      "metal": {
        estimatedValue: `₹${(parseFloat(weight) * 40).toFixed(2)}`,
        co2Saved: `${(parseFloat(weight) * 2.1).toFixed(2)} kg`,
        recommendations: [
          "Remove non-metal attachments for higher value",
          "Separate different types of metals for better pricing",
          "Clean metals from contaminants before recycling"
        ]
      },
      "plastic": {
        estimatedValue: `₹${(parseFloat(weight) * 8).toFixed(2)}`,
        co2Saved: `${(parseFloat(weight) * 1.5).toFixed(2)} kg`,
        recommendations: [
          "Rinse plastics to remove food residue",
          "Separate by plastic type when possible",
          "Remove paper labels for better recycling process"
        ]
      },
      "paper": {
        estimatedValue: `₹${(parseFloat(weight) * 12).toFixed(2)}`,
        co2Saved: `${(parseFloat(weight) * 1.1).toFixed(2)} kg`,
        recommendations: [
          "Keep paper dry to maintain value",
          "Remove plastic sleeves or covers",
          "Stack and bundle neatly for easier transport"
        ]
      },
      "electronic": {
        estimatedValue: `₹${(parseFloat(weight) * 35).toFixed(2)}`,
        co2Saved: `${(parseFloat(weight) * 3.2).toFixed(2)} kg`,
        recommendations: [
          "Remove batteries before recycling",
          "Keep components intact when possible",
          "Separate circuit boards for specialized recycling"
        ]
      }
    };
    
    if (materialType && weight && parseFloat(weight) > 0) {
      setAnalysisResult(mockResults[materialType as keyof typeof mockResults]);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">AI Material Analyzer</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Analyze your recyclable materials to get accurate value estimates and smart recommendations
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-indigo-500" />
                    Material Analysis
                  </CardTitle>
                  <CardDescription>
                    Enter details about your material to get an analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="material">Material Type</Label>
                      <Select value={materialType} onValueChange={setMaterialType}>
                        <SelectTrigger id="material">
                          <SelectValue placeholder="Select material type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metal">Metal</SelectItem>
                          <SelectItem value="plastic">Plastic</SelectItem>
                          <SelectItem value="paper">Paper</SelectItem>
                          <SelectItem value="electronic">Electronic Waste</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        placeholder="Enter weight in kg" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="button" 
                        onClick={handleAnalyze}
                        className="w-full"
                        disabled={!materialType || !weight || parseFloat(weight) <= 0}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Analyze Material
                      </Button>
                    </div>
                  </form>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 mb-3">Upload an image for AI identification</p>
                    <Button variant="outline" className="w-full" disabled>
                      <Camera className="mr-2 h-4 w-4" />
                      Image Upload (Coming Soon)
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-emerald-500" />
                    Analysis Results
                  </CardTitle>
                  <CardDescription>
                    {analysisResult ? "Your material analysis results" : "Enter material details to see results"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!analysisResult ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                      <BarChart className="h-12 w-12 mb-4 opacity-20" />
                      <p>No analysis data yet. Select material type and enter weight to analyze.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Value</h3>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{analysisResult.estimatedValue}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Environmental Impact</h3>
                        <p className="font-medium">CO₂ Saved: <span className="text-emerald-600 dark:text-emerald-400">{analysisResult.co2Saved}</span></p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recommendations</h3>
                        <ul className="space-y-2">
                          {analysisResult.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Upload Multiple Items for Batch Analysis</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For bulk materials or multiple item types, use our batch analysis tool to get comprehensive evaluation.
              </p>
              <Button variant="secondary" disabled>
                <Upload className="mr-2 h-4 w-4" />
                Batch Analysis (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MaterialAnalyzer;
