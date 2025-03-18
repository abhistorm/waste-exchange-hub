
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, Info, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
      <div className="flex flex-col p-4 space-y-4">
        <Link 
          to="/"
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Link>
        <Link 
          to="/store"
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Store
        </Link>
        <a 
          href="#process" 
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <Info className="mr-2 h-4 w-4" />
          How It Works
        </a>
        <a 
          href="#benefits" 
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <Info className="mr-2 h-4 w-4" />
          Benefits
        </a>
        <a 
          href="#contact" 
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <Phone className="mr-2 h-4 w-4" />
          Contact
        </a>
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
          <Link to="/store" onClick={onClose}>
            <Button variant="default" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700">
              <ShoppingBag className="h-4 w-4" />
              Visit Store
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
