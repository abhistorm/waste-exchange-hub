
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecyclingAssistant from '@/components/RecyclingAssistant';
import { Button } from '@/components/ui/button';
import { Bot, MessageCircle, Lightbulb, Upload, Image } from 'lucide-react';

const AIAssistant = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}`}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">AI Recycling Assistant</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Get expert guidance on recycling, material identification, and maximizing the value of your waste materials.
            </p>
            
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                  <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Smart Recycling Assistant</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Ask questions about recycling materials</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI assistant can help you with:
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Identifying which materials are recyclable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Estimating the value of your scrap materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Providing best practices for separating and preparing materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Answering common questions about recycling</span>
                  </li>
                </ul>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => setShowAssistant(true)} 
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    size="lg"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start Chat with Recycling Assistant
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                    <Image className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Material Identification</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Upload an image of your material and our AI will identify it and provide recycling guidance.
                </p>
                <Button variant="outline" className="w-full" disabled>
                  <Upload className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                    <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Custom Guidance</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get personalized recycling plans based on your specific materials and quantities.
                </p>
                <Button variant="outline" className="w-full" disabled>
                  <Upload className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {showAssistant && <RecyclingAssistant />}
      
      <Footer />
    </div>
  );
};

export default AIAssistant;
