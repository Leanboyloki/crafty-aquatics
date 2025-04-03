
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/lib/types';

interface OrderStatusBadgeProps {
  status: Order['status'];
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'processing':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'shipped':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'delivered':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Badge className={getStatusStyles(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default OrderStatusBadge;
