
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Bot, Recycle, BarChart, 
  DollarSign, MessageCircle, Lightbulb, ShoppingBag
} from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
    </Link>
  );
};

const DesktopNav: React.FC = () => {
  return (
    <div className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList className="space-x-1">
          <NavigationMenuItem>
            <NavLink to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </NavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavLink to="/store">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Store
            </NavLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavLink to="/material-marketplace">
              <Recycle className="mr-2 h-4 w-4" />
              Marketplace
            </NavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavLink to="/local-rates">
              <DollarSign className="mr-2 h-4 w-4" />
              Local Rates
            </NavLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="group">
              <Bot className="mr-2 h-4 w-4" />
              <span>AI Solutions</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200">
                {aiSolutionsItems.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.url}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                      >
                        <div className="text-sm font-medium leading-none flex items-center">
                          <item.icon className="mr-2 h-4 w-4 text-primary group-hover:text-primary/80" />
                          {item.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
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
