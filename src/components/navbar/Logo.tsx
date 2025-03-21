
import React from 'react';
import { Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 text-primary font-semibold text-xl transition-all duration-300 hover:opacity-80"
    >
      <div className="relative">
        <Package className="h-6 w-6" />
        <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-400" />
      </div>
      <div className="flex items-center">
        <span>WasteExchange</span>
        <span className="text-xs ml-1 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-1.5 py-0.5 rounded-sm font-normal">AI</span>
      </div>
    </Link>
  );
};

export default Logo;
