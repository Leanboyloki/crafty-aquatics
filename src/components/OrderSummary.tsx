
import React from 'react';
import { CartItem } from '@/lib/types';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping = 0,
  tax = 0,
  total
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="divide-y divide-gray-200">
        <div className="py-4">
          <h4 className="text-sm font-medium mb-2">Items ({items.reduce((acc, item) => acc + item.quantity, 0)})</h4>
          
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product.name} x {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="py-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="py-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-lg text-aqua-700">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
