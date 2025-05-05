
import React from 'react';
import { Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 text-primary font-semibold text-xl transition-all duration-300 hover:opacity-80 group"
    >
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-400 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
          <Package className="h-5 w-5 text-white" />
        </div>
        <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-400 animate-pulse-soft" />
      </div>
      <div className="flex items-center">
        <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">WasteExchange</span>
        <span className="text-xs ml-1 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-1.5 py-0.5 rounded-sm font-normal shadow-sm">AI</span>
      </div>
    </Link>
  );
};

export default Logo;
