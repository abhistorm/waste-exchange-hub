
import React from 'react';
import { Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 font-bold text-xl transition-all duration-300 hover:opacity-90 group"
    >
      <div className="relative">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse-soft" />
      </div>
      <div className="flex items-center">
        <span className="text-white font-extrabold">Waste<span className="text-yellow-300">Exchange</span></span>
        <span className="text-xs ml-1 bg-white text-primary px-1.5 py-0.5 rounded-md font-semibold shadow-sm">AI</span>
      </div>
    </Link>
  );
};

export default Logo;
