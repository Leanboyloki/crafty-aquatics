
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import RequireAuth from '@/components/RequireAuth';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { Order } from '@/lib/types';

const UserOrders = () => {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const navigate = useNavigate();
  
  const orders = user ? getUserOrders(user.id) : [];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const OrderDetailsDialog = ({ order }: { order: Order }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
          <DialogDescription>
            Placed on {formatDate(order.createdAt)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Status</h4>
            <OrderStatusBadge status={order.status} />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
            <p className="text-sm">{order.address}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Payment Method</h4>
            <p className="text-sm">Cash on Delivery</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Order Items</h4>
            <ul className="divide-y">
              {order.items.map((item) => (
                <li key={item.product.id} className="py-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{item.product.name} x {item.quantity}</span>
                    <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <RequireAuth>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Package className="h-8 w-8" />
            My Orders
          </h1>
          
          {orders.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <OrderStatusBadge status={order.status} />
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <OrderDetailsDialog order={order} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-16">
              <div className="text-aqua-600 mb-4">
                <Package className="inline-block h-16 w-16" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
              <Button 
                className="bg-aqua-600 hover:bg-aqua-700"
                onClick={() => navigate('/shop')}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Start Shopping
              </Button>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </RequireAuth>
  );
};

export default UserOrders;
