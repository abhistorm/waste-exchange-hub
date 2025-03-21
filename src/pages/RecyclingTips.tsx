
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lightbulb, Search, ChevronRight, ThumbsUp, Share, Bookmark, Tag } from 'lucide-react';

const RECYCLING_TIPS = [
  {
    id: 1,
    category: "Plastic",
    title: "Rinse Plastics Thoroughly",
    description: "Food residue can contaminate recycling batches. Rinse all plastic containers before recycling to increase their value and recyclability.",
    difficulty: "Easy"
  },
  {
    id: 2,
    category: "Paper",
    title: "Keep Paper Dry",
    description: "Wet paper is difficult to recycle and can contaminate other materials. Store paper in a dry place before recycling.",
    difficulty: "Easy"
  },
  {
    id: 3,
    category: "Electronics",
    title: "Remove Batteries First",
    description: "Always remove batteries from electronics before recycling. Batteries contain hazardous materials and need special handling.",
    difficulty: "Medium"
  },
  {
    id: 4,
    category: "Metal",
    title: "Separate Different Metals",
    description: "Different metals have different values. Separate aluminum, copper, and steel to get the best rates for your scrap.",
    difficulty: "Medium"
  },
  {
    id: 5,
    category: "Glass",
    title: "Remove Caps and Lids",
    description: "Most recycling facilities require caps and lids to be removed from glass bottles and jars before processing.",
    difficulty: "Easy"
  },
  {
    id: 6,
    category: "Plastic",
    title: "Check the Recycling Symbol",
    description: "Not all plastics are recyclable. Check the recycling symbol (numbers 1-7) to determine if your local facility accepts that type.",
    difficulty: "Easy"
  },
  {
    id: 7,
    category: "Paper",
    title: "Remove Plastic Windows",
    description: "For envelopes with plastic windows, remove the plastic part before recycling the paper portion.",
    difficulty: "Easy"
  },
  {
    id: 8,
    category: "Electronics",
    title: "Erase Personal Data",
    description: "Before recycling computers, phones, or tablets, make sure to erase all personal data to protect your privacy.",
    difficulty: "Medium"
  }
];

const RecyclingTips = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter tips based on search query and active category
  const filteredTips = RECYCLING_TIPS.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? tip.category === activeCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filter buttons
  const categories = Array.from(new Set(RECYCLING_TIPS.map(tip => tip.category)));

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Smart Recycling Tips</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              AI-powered recycling tips to help you maximize the value of your materials and reduce environmental impact
            </p>
            
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  className="pl-10" 
                  placeholder="Search for recycling tips..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Button 
                variant={activeCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(null)}
              >
                All
              </Button>
              
              {categories.map(category => (
                <Button 
                  key={category} 
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="space-y-5">
              {filteredTips.length > 0 ? (
                filteredTips.map(tip => (
                  <Card key={tip.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                              <Tag className="h-3 w-3 mr-1" />
                              {tip.category}
                            </span>
                            <span className="ml-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded">
                              {tip.difficulty}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{tip.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        {tip.description}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Lightbulb className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No tips found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
            
            <div className="mt-10 p-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                Get Personalized Recycling Tips
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tell us what materials you're recycling and our AI will provide custom tips to maximize their value.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="What materials are you recycling?" className="flex-1" />
                <Button>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Get Custom Tips
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecyclingTips;
