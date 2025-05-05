
import React from 'react';
import { Search, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ActionButtons: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <button className="p-2 text-gray-700 hover:text-primary transition-colors duration-200">
        <Search className="h-5 w-5" />
      </button>
      
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Hello, {user?.name}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="flex items-center gap-1"
          >
            <LogIn className="h-4 w-4 rotate-180" />
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/signin">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
