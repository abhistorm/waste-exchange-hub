
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { useNavigate } from 'react-router-dom';

interface StoreHeaderProps {
  onOpenListModal: () => void;
}

const StoreHeader = ({ onOpenListModal }: StoreHeaderProps) => {
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Recycled Products Marketplace</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-xl">
              Discover unique, handcrafted items made from recycled materials. 
              Support sustainable artisans and reduce waste.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <CartDrawer handleCheckout={handleCheckout} />
            <Button 
              onClick={onOpenListModal}
              className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
              size="lg"
            >
              <Plus size={18} />
              List Your Product
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreHeader;
