
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, ShoppingBag, UserPlus, LogIn, Bot, DollarSign, 
  MessageCircle, BarChart, Recycle, Lightbulb, User, 
  LogOut, Shield, Package, Paintbrush 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  
  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
      <div className="flex flex-col p-4 space-y-4">
        {isAuthenticated && (
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        )}
        
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
        
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="px-4 py-2 text-sm font-semibold text-gray-500">Marketplaces</p>
          <Link 
            to="/material-marketplace"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
            onClick={onClose}
          >
            <Package className="mr-2 h-4 w-4 text-emerald-600" />
            Waste Materials
          </Link>
          <Link 
            to="/artisan-marketplace"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
            onClick={onClose}
          >
            <Paintbrush className="mr-2 h-4 w-4 text-indigo-600" />
            Artisan Products
          </Link>
        </div>
        
        <Link 
          to="/local-rates"
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
          onClick={onClose}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Local Rates
        </Link>
        
        {isAuthenticated && isAdmin && (
          <Link 
            to="/admin"
            className="px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md transition-colors duration-200 flex items-center"
            onClick={onClose}
          >
            <Shield className="mr-2 h-4 w-4" />
            Admin Dashboard
          </Link>
        )}
        
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
        
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/signin" onClick={onClose}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={onClose}>
                <Button variant="default" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
