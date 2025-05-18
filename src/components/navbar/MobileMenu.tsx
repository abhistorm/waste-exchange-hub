
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Bot, DollarSign, 
  MessageCircle, BarChart, Recycle, Lightbulb, ShoppingBag,
  LogIn, UserPlus, ChevronRight, User
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
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="absolute top-[65px] right-0 w-full max-w-[300px] bg-gradient-to-br from-slate-800 to-slate-900 h-[calc(100vh-65px)] shadow-xl animate-slide-in-right overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col p-4 space-y-1">
          <MobileNavLink to="/" icon={Home} label="Home" onClick={onClose} isActive={location.pathname === "/"} />
          <MobileNavLink to="/material-marketplace" icon={Recycle} label="Marketplace" onClick={onClose} isActive={location.pathname === "/material-marketplace"} />
          <MobileNavLink to="/store" icon={ShoppingBag} label="Store" onClick={onClose} isActive={location.pathname === "/store"} />
          <MobileNavLink to="/local-rates" icon={DollarSign} label="Local Rates" onClick={onClose} isActive={location.pathname === "/local-rates"} />
          
          <div className="pt-2 pb-2">
            <p className="px-4 py-2 text-sm font-semibold text-white/60">AI-Powered Solutions</p>
          </div>
          
          <MobileNavLink 
            to="/ai-assistant" 
            icon={MessageCircle} 
            label="Recycling Assistant" 
            onClick={onClose} 
            isSubItem 
            isActive={location.pathname === "/ai-assistant"}
          />
          <MobileNavLink 
            to="/material-analyzer" 
            icon={BarChart} 
            label="Material Analyzer" 
            onClick={onClose} 
            isSubItem 
            isActive={location.pathname === "/material-analyzer"} 
          />
          <MobileNavLink 
            to="/carbon-calculator" 
            icon={Recycle} 
            label="Carbon Calculator" 
            onClick={onClose} 
            isSubItem 
            isActive={location.pathname === "/carbon-calculator"} 
          />
          <MobileNavLink 
            to="/recycling-tips" 
            icon={Lightbulb} 
            label="Smart Recycling Tips" 
            onClick={onClose} 
            isSubItem 
            isActive={location.pathname === "/recycling-tips"} 
          />
        </div>

        <Separator className="my-2 bg-white/10" />
        
        {isAuthenticated ? (
          <div className="space-y-3 p-4">
            <div className="px-4 py-3 rounded-lg bg-white/10 flex items-center">
              <User className="h-5 w-5 mr-2 text-white/70" />
              <div className="text-sm font-medium text-white">
                Hello, {user?.name}
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-1 border-white/20 text-white hover:bg-white/10 hover:text-white"
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
              <Button variant="outline" className="w-full flex items-center justify-center gap-1 border-white/20 text-white hover:bg-white/10 hover:text-white">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link to="/signup" onClick={onClose} className="block">
              <Button className="w-full flex items-center justify-center gap-1 bg-white hover:bg-white/90 text-primary">
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
  isActive: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  onClick,
  isSubItem = false,
  isActive = false
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center justify-between",
        isSubItem && "pl-6 text-sm",
        isActive && "bg-white/10 font-medium"
      )}
      onClick={onClick}
    >
      <span className="flex items-center">
        <Icon className={cn("mr-2", isSubItem ? "h-4 w-4" : "h-4 w-4")} />
        {label}
      </span>
      <ChevronRight className="h-4 w-4 text-white/50" />
    </Link>
  );
};

export default MobileMenu;
