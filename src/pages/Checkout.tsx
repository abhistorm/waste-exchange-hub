
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaymentGateway from '@/components/checkout/PaymentGateway';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthCheck from '@/components/auth/AuthCheck';

const Checkout = () => {
  const { items, totalItems } = useCart();
  const navigate = useNavigate();

  // Redirect to store if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/store');
    }
  }, [items, navigate]);

  // If cart is empty, show a message
  if (items.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Add some products to your cart and come back.
          </p>
          <Button onClick={() => navigate('/store')}>Continue Shopping</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <AuthCheck>
      <div>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <PaymentGateway />
          </div>
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default Checkout;
