
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, Bot, Recycle, BarChart, DollarSign, MessageCircle, Zap, Lightbulb } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

const DesktopNav: React.FC = () => {
  return (
    <div className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/store">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Store
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/local-rates">
                <DollarSign className="mr-2 h-4 w-4" />
                Local Rates
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Bot className="mr-2 h-4 w-4" />
              AI Solutions
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/ai-assistant"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none flex items-center">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Recycling Assistant
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Chat with our AI to identify and categorize materials for optimal recycling.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/material-analyzer"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none flex items-center">
                        <BarChart className="mr-2 h-4 w-4" />
                        Material Analyzer
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        AI-powered material analysis and value estimation for your waste materials.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/carbon-calculator"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none flex items-center">
                        <Recycle className="mr-2 h-4 w-4" />
                        Carbon Calculator
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Calculate the environmental impact of your recycling efforts.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/recycling-tips"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Smart Recycling Tips
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        AI-generated tips to maximize the value and environmental impact of your recycling.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNav;
