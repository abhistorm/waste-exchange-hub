
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserRound, LogOut, Home, Bell, Settings } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  userName: string;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  title, 
  userName,
  onLogout 
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-8">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span className="hidden md:inline">Back to Site</span>
              </Button>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center ml-4 border-l pl-4">
              <div className="mr-2 hidden md:block">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserRound className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
