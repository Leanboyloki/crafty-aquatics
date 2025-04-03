
import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncrement = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
        <p className="font-medium text-aqua-600">${product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handleDecrement}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handleIncrement}
          disabled={quantity >= product.stock}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-right min-w-[80px]">
        <p className="font-bold">${(product.price * quantity).toFixed(2)}</p>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-gray-400 hover:text-red-500"
        onClick={() => removeFromCart(product.id)}
      >
        <Trash className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CartItem;
