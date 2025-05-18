
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, ShoppingBag, Recycle, BarChart, 
  DollarSign, MessageCircle, Lightbulb, Bot
} from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const NavLink = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
        isActive 
          ? "bg-white/20 text-white" 
          : "text-white/90 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
      <span className={cn(
        "absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300",
        isActive && "scale-x-75"
      )}></span>
    </Link>
  );
};

const DesktopNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList className="space-x-1">
          <NavigationMenuItem>
            <NavLink to="/" isActive={isActive("/")}>
              <Home className="mr-1 h-4 w-4" />
              Home
            </NavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavLink to="/store" isActive={isActive("/store")}>
              <ShoppingBag className="mr-1 h-4 w-4" />
              Store
            </NavLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavLink to="/material-marketplace" isActive={isActive("/material-marketplace")}>
              <Recycle className="mr-1 h-4 w-4" />
              Marketplace
            </NavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavLink to="/local-rates" isActive={isActive("/local-rates")}>
              <DollarSign className="mr-1 h-4 w-4" />
              Local Rates
            </NavLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300">
              <Bot className="mr-1 h-4 w-4" />
              <span>AI Tools</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-white/10">
                {aiSolutionsItems.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.url}
                        className="flex p-3 select-none space-y-1 rounded-lg hover:bg-white/10 transition-colors duration-300 group"
                      >
                        <div className="bg-primary/20 rounded-full p-2 mr-3">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium leading-none text-white mb-1 group-hover:text-white/90">
                            {item.title}
                          </div>
                          <p className="line-clamp-2 text-xs text-white/70 leading-snug group-hover:text-white/80">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const aiSolutionsItems = [
  {
    title: "Recycling Assistant",
    description: "Chat with our AI to identify and categorize materials for optimal recycling.",
    url: "/ai-assistant",
    icon: MessageCircle,
  },
  {
    title: "Material Analyzer",
    description: "AI-powered material analysis and value estimation for your waste materials.",
    url: "/material-analyzer",
    icon: BarChart,
  },
  {
    title: "Carbon Calculator",
    description: "Calculate the environmental impact of your recycling efforts.",
    url: "/carbon-calculator",
    icon: Recycle,
  },
  {
    title: "Smart Recycling Tips",
    description: "AI-generated tips to maximize the value and environmental impact of your recycling.",
    url: "/recycling-tips",
    icon: Lightbulb,
  },
];

export default DesktopNav;
