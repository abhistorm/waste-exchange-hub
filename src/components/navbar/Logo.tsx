
import React from 'react';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 text-primary font-semibold text-xl transition-all duration-300 hover:opacity-80"
    >
      <Package className="h-6 w-6" />
      <span>WasteExchange</span>
    </Link>
  );
};

export default Logo;
