
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Bot, DollarSign, 
  MessageCircle, BarChart, Recycle, Lightbulb, ShoppingBag,
  LogIn, UserPlus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout, user } = useAuth();

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
          to="/material-marketplace"
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <Recycle className="mr-2 h-4 w-4" />
          Marketplace
        </Link>
        
        <Link 
          to="/store"
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Store
        </Link>
        
        <Link 
          to="/local-rates"
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Local Rates
        </Link>
        
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="px-4 py-2 text-sm font-semibold text-gray-500">AI-Powered Solutions</p>
          <Link 
            to="/ai-assistant"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
            onClick={onClose}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Recycling Assistant
          </Link>
          <Link 
            to="/material-analyzer"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
            onClick={onClose}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Material Analyzer
          </Link>
          <Link 
            to="/carbon-calculator"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
            onClick={onClose}
          >
            <Recycle className="mr-2 h-4 w-4" />
            Carbon Calculator
          </Link>
          <Link 
            to="/recycling-tips"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
            onClick={onClose}
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Smart Recycling Tips
          </Link>
        </div>

        <Separator />
        
        {isAuthenticated ? (
          <div className="space-y-3 pt-2">
            <div className="px-4 py-2 text-sm font-medium">
              Hello, {user?.name}
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-1"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <LogIn className="h-4 w-4 rotate-180" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <Link to="/signin" onClick={onClose}>
              <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link to="/signup" onClick={onClose}>
              <Button className="w-full flex items-center justify-center gap-1">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
