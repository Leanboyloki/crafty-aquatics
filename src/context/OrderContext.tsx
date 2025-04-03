
import React, { createContext, useContext, useState } from 'react';
import { Order, CartItem } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

interface OrderContextType {
  orders: Order[];
  createOrder: (userId: string, items: CartItem[], address: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getUserOrders: (userId: string) => Order[];
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const createOrder = (userId: string, items: CartItem[], address: string): Order => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      address,
      paymentMethod: 'cashOnDelivery'
    };
    
    setOrders([...orders, newOrder]);
    
    toast({
      title: "Order placed successfully",
      description: `Your order #${newOrder.id} has been placed and is being processed.`,
    });
    
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status } 
        : order
    ));
    
    toast({
      title: "Order updated",
      description: `Order #${orderId} status changed to ${status}.`,
    });
  };

  const getUserOrders = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  const getAllOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      createOrder, 
      updateOrderStatus, 
      getUserOrders,
      getAllOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
