
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItemComponent from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Cart = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="h-8 w-8" />
          Your Cart
        </h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Cart Items ({items.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <CartItemComponent key={item.product.id} item={item} />
                  ))}
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{total >= 3000 ? 'Free' : '₹299'}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-lg text-aqua-700">
                      ₹{(total >= 3000 ? total : total + 299).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-aqua-600 hover:bg-aqua-700 mb-3"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/shop')}
                >
                  Continue Shopping
                </Button>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>Free shipping on orders over ₹3000.</p>
                  <p>Safe and secure checkout.</p>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-aqua-600 mb-4">
              <ShoppingCart className="inline-block h-16 w-16" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button 
              className="bg-aqua-600 hover:bg-aqua-700"
              onClick={() => navigate('/shop')}
            >
              Browse Products
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
