
import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequireAuth from '@/components/RequireAuth';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { User } from '@/lib/types';

const AdminCustomers = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  
  // In a real application, you would get this from the backend
  // Here we'll simulate some customer data based on orders and the admin user
  const mockCustomers: User[] = [
    { id: '1', name: 'Admin User', email: 'admin@aqua.com', role: 'admin' },
    { id: '2', name: 'John Smith', email: 'john@example.com', role: 'user' },
    { id: '3', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user' },
    { id: '4', name: 'Michael Brown', email: 'michael@example.com', role: 'user' },
    { id: '5', name: 'Emily Davis', email: 'emily@example.com', role: 'user' },
  ];
  
  // Filter customers based on search query
  const filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.includes(searchQuery)
  );
  
  // Get order count for each customer
  const getOrderCount = (userId: string) => {
    return orders.filter(order => order.userId === userId).length;
  };
  
  // Calculate total spend for each customer
  const getTotalSpend = (userId: string) => {
    return orders
      .filter(order => order.userId === userId)
      .reduce((total, order) => total + order.total, 0);
  };

  return (
    <RequireAuth allowedRoles={['admin']}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Users className="h-8 w-8" />
            Customers
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Customer Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Customer Since</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">#{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          <Badge className={customer.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'}>
                            {customer.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{getOrderCount(customer.id)}</TableCell>
                        <TableCell>${getTotalSpend(customer.id).toFixed(2)}</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-gray-500">No customers found matching your search.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </RequireAuth>
  );
};

export default AdminCustomers;
