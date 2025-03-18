
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Package, Search, Menu, X, ShoppingBag, Home, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-6",
        isScrolled 
          ? "py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary font-semibold text-xl transition-all duration-300 hover:opacity-80"
        >
          <Package className="h-6 w-6" />
          <span>WasteExchange</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/store">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Store
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Info className="mr-2 h-4 w-4" />
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#process"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">How It Works</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn about our recycling process and how we turn waste into valuable products.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#benefits"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Benefits</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Discover the environmental and social benefits of our platform.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a href="#contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Phone className="mr-2 h-4 w-4" />
                    Contact
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-gray-700 hover:text-primary transition-colors duration-200">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/store">
            <Button variant="default" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
              <ShoppingBag className="h-4 w-4" />
              Visit Store
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-700" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/"
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/store"
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Store
            </Link>
            <a 
              href="#process" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Info className="mr-2 h-4 w-4" />
              How It Works
            </a>
            <a 
              href="#benefits" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Info className="mr-2 h-4 w-4" />
              Benefits
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </a>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
              <Link to="/store" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <ShoppingBag className="h-4 w-4" />
                  Visit Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
