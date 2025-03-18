
import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ActionButtons: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <button className="p-2 text-gray-700 hover:text-primary transition-colors duration-200">
        <Search className="h-5 w-5" />
      </button>
      <Link to="/store">
        <Button variant="default" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
          <ShoppingBag className="h-4 w-4" />
          Visit Store
        </Button>
      </Link>
    </div>
  );
};

export default ActionButtons;
