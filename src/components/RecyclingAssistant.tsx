
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Trash2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet';

// Basic predefined responses for the assistant
const PREDEFINED_RESPONSES: Record<string, string> = {
  'greeting': "Hello! I'm your recycling assistant. How can I help you today?",
  'default': "I'm sorry, I don't have specific information about that. For detailed guidance, please consult your local waste management authorities.",
  'metal': "Metal items like cans and aluminum foil can typically be recycled. Clean them first and check if your local facility accepts them.",
  'plastic': "Most plastic containers with recycling symbols 1-2 can be recycled. Some facilities also accept 5. Always clean containers before recycling.",
  'paper': "Paper products are recyclable, but avoid recycling paper that's soiled with food or grease.",
  'glass': "Glass bottles and jars are highly recyclable. Remove caps and rinse before recycling.",
  'electronics': "Electronic waste should not go in regular recycling. Look for e-waste recycling events or facilities in your area.",
  'batteries': "Batteries contain hazardous materials and should never go in regular trash or recycling. Take them to designated collection points.",
  'textiles': "Clothing and textiles can often be donated if in good condition. Some specialized recycling programs also accept worn textiles.",
  'composting': "Food scraps, yard waste, and many paper products can be composted. This reduces methane emissions from landfills.",
  'hazardous': "Hazardous waste like paint, chemicals, and certain cleaning products require special disposal. Contact your local waste management facility.",
};

// Sample suggested questions
const SUGGESTED_QUESTIONS = [
  "How do I recycle plastic bottles?",
  "Where can I recycle electronics?",
  "What items cannot be recycled?",
  "How to dispose of hazardous waste?",
  "What are the benefits of recycling?",
];

interface Message {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const RecyclingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat with a greeting when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: 'assistant',
          text: PREDEFINED_RESPONSES.greeting,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate assistant response after a short delay
    setTimeout(() => {
      const response = getAssistantResponse(input);
      
      const newAssistantMessage: Message = {
        id: messages.length + 2,
        sender: 'assistant',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const getAssistantResponse = (query: string): string => {
    // Simple keyword matching for demo purposes
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi') || lowercaseQuery.includes('hey')) {
      return PREDEFINED_RESPONSES.greeting;
    }
    
    if (lowercaseQuery.includes('metal') || lowercaseQuery.includes('aluminum') || lowercaseQuery.includes('can')) {
      return PREDEFINED_RESPONSES.metal;
    }
    
    if (lowercaseQuery.includes('plastic') || lowercaseQuery.includes('bottle')) {
      return PREDEFINED_RESPONSES.plastic;
    }
    
    if (lowercaseQuery.includes('paper') || lowercaseQuery.includes('cardboard') || lowercaseQuery.includes('newspaper')) {
      return PREDEFINED_RESPONSES.paper;
    }
    
    if (lowercaseQuery.includes('glass') || lowercaseQuery.includes('bottle') || lowercaseQuery.includes('jar')) {
      return PREDEFINED_RESPONSES.glass;
    }
    
    if (lowercaseQuery.includes('electronic') || lowercaseQuery.includes('computer') || lowercaseQuery.includes('phone')) {
      return PREDEFINED_RESPONSES.electronics;
    }
    
    if (lowercaseQuery.includes('battery') || lowercaseQuery.includes('batteries')) {
      return PREDEFINED_RESPONSES.batteries;
    }
    
    if (lowercaseQuery.includes('textile') || lowercaseQuery.includes('cloth') || lowercaseQuery.includes('fabric')) {
      return PREDEFINED_RESPONSES.textiles;
    }
    
    if (lowercaseQuery.includes('compost') || lowercaseQuery.includes('food waste') || lowercaseQuery.includes('organic')) {
      return PREDEFINED_RESPONSES.composting;
    }
    
    if (lowercaseQuery.includes('hazardous') || lowercaseQuery.includes('paint') || lowercaseQuery.includes('chemical')) {
      return PREDEFINED_RESPONSES.hazardous;
    }
    
    return PREDEFINED_RESPONSES.default;
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    
    // Focus the input after setting the suggested question
    document.getElementById('chat-input')?.focus();
  };
  
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'assistant',
        text: PREDEFINED_RESPONSES.greeting,
        timestamp: new Date()
      }
    ]);
  };
  
  return (
    <>
      {/* Chat button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md p-0 flex flex-col h-[85vh] sm:h-screen">
          <SheetHeader className="border-b px-4 py-3 flex-shrink-0">
            <div className="flex justify-between items-center">
              <SheetTitle className="flex items-center">
                <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                Recycling Assistant
              </SheetTitle>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearChat} 
                  title="Clear chat"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>
          
          {/* Chat messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <div className="text-sm">{message.text}</div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Suggested questions */}
            {messages.length < 3 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Suggested questions</h4>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
          
          {/* Input area */}
          <SheetFooter className="mt-auto border-t p-4">
            <form onSubmit={handleSubmit} className="w-full flex gap-2">
              <Input
                id="chat-input"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default RecyclingAssistant;
