
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Bot, DollarSign, 
  MessageCircle, BarChart, Recycle, Lightbulb, ShoppingBag,
  LogIn, UserPlus, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout, user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="absolute top-[65px] right-0 w-full max-w-[300px] bg-white dark:bg-gray-900 h-[calc(100vh-65px)] shadow-xl animate-slide-in-right overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col p-4 space-y-1">
          <MobileNavLink to="/" icon={Home} label="Home" onClick={onClose} />
          <MobileNavLink to="/material-marketplace" icon={Recycle} label="Marketplace" onClick={onClose} />
          <MobileNavLink to="/store" icon={ShoppingBag} label="Store" onClick={onClose} />
          <MobileNavLink to="/local-rates" icon={DollarSign} label="Local Rates" onClick={onClose} />
          
          <div className="pt-2 pb-2">
            <p className="px-4 py-2 text-sm font-semibold text-gray-500">AI-Powered Solutions</p>
          </div>
          
          <MobileNavLink to="/ai-assistant" icon={MessageCircle} label="Recycling Assistant" onClick={onClose} isSubItem />
          <MobileNavLink to="/material-analyzer" icon={BarChart} label="Material Analyzer" onClick={onClose} isSubItem />
          <MobileNavLink to="/carbon-calculator" icon={Recycle} label="Carbon Calculator" onClick={onClose} isSubItem />
          <MobileNavLink to="/recycling-tips" icon={Lightbulb} label="Smart Recycling Tips" onClick={onClose} isSubItem />
        </div>

        <Separator className="my-2" />
        
        {isAuthenticated ? (
          <div className="space-y-3 p-4">
            <div className="px-2 py-2 text-sm font-medium bg-gray-50 rounded-md">
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
          <div className="space-y-3 p-4">
            <Link to="/signin" onClick={onClose} className="block">
              <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link to="/signup" onClick={onClose} className="block">
              <Button className="w-full flex items-center justify-center gap-1 bg-primary hover:bg-primary/90">
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

interface MobileNavLinkProps {
  to: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  onClick: () => void;
  isSubItem?: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  onClick,
  isSubItem = false
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center justify-between",
        isSubItem && "pl-6 text-sm"
      )}
      onClick={onClick}
    >
      <span className="flex items-center">
        <Icon className={cn("mr-2", isSubItem ? "h-4 w-4" : "h-4 w-4")} />
        {label}
      </span>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </Link>
  );
};

export default MobileMenu;
