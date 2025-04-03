
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <div className="text-green-500 mb-4">
            <CheckCircle className="h-20 w-20 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            
            <ul className="text-left space-y-4">
              <li className="flex items-start">
                <Package className="h-5 w-5 text-aqua-600 mr-2 mt-0.5" />
                <span>
                  <strong>Processing:</strong> Your order is being prepared for shipping. 
                  You will receive an email confirmation with your order details shortly.
                </span>
              </li>
              <li className="flex items-start">
                <Home className="h-5 w-5 text-aqua-600 mr-2 mt-0.5" />
                <span>
                  <strong>Delivery:</strong> Once your order ships, you'll receive tracking 
                  information. Cash on delivery payment will be collected upon arrival.
                </span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/orders')}
            >
              View My Orders
            </Button>
            
            <Button 
              className="flex-1 bg-aqua-600 hover:bg-aqua-700"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </Button>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
