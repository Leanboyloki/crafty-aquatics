
import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, Calendar, User, Shield, Edit } from 'lucide-react';
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequireAuth from '@/components/RequireAuth';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { User as UserType } from '@/lib/types';

const AdminCustomers = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<UserType | null>(null);
  
  // In a real application, you would get this from the backend
  // Here we'll simulate some customer data based on orders and the admin user
  const mockCustomers: UserType[] = [
    { id: '1', name: 'Admin User', email: 'admin@aqua.com', role: 'admin' },
    { id: '2', name: 'John Smith', email: 'john@example.com', role: 'user' },
    { id: '3', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user' },
    { id: '4', name: 'Michael Brown', email: 'michael@example.com', role: 'user' },
    { id: '5', name: 'Emily Davis', email: 'emily@example.com', role: 'user' },
  ];

  // Additional user details (would come from backend in a real app)
  const userDetails = {
    '1': { 
      phone: '+91 98765 43210', 
      address: 'Mumbai, Maharashtra, India', 
      registered: '2023-12-10', 
      lastLogin: '2025-04-04',
      orderCount: 15,
      totalSpent: 24500,
    },
    '2': { 
      phone: '+91 87654 32109', 
      address: 'Delhi, India', 
      registered: '2024-01-22', 
      lastLogin: '2025-04-03',
      orderCount: 8,
      totalSpent: 15800,
    },
    '3': { 
      phone: '+91 76543 21098', 
      address: 'Bangalore, Karnataka, India', 
      registered: '2024-02-15', 
      lastLogin: '2025-03-30',
      orderCount: 5,
      totalSpent: 9200,
    },
    '4': { 
      phone: '+91 65432 10987', 
      address: 'Chennai, Tamil Nadu, India', 
      registered: '2024-03-05', 
      lastLogin: '2025-04-02',
      orderCount: 3,
      totalSpent: 6500,
    },
    '5': { 
      phone: '+91 54321 09876', 
      address: 'Kolkata, West Bengal, India', 
      registered: '2024-03-25', 
      lastLogin: '2025-04-01',
      orderCount: 1,
      totalSpent: 1899,
    }
  };
  
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
  
  const showCustomerDetails = (customer: UserType) => {
    setSelectedCustomer(customer);
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
                    <TableHead>Registration Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                        <TableCell>
                          {userDetails[customer.id as keyof typeof userDetails]?.orderCount || getOrderCount(customer.id)}
                        </TableCell>
                        <TableCell>
                          ₹{(userDetails[customer.id as keyof typeof userDetails]?.totalSpent || getTotalSpend(customer.id)).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {userDetails[customer.id as keyof typeof userDetails] 
                            ? new Date(userDetails[customer.id as keyof typeof userDetails].registered).toLocaleDateString() 
                            : new Date().toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => showCustomerDetails(customer)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
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
        
        {/* Customer Details Dialog */}
        {selectedCustomer && (
          <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Customer Details</DialogTitle>
                <DialogDescription>
                  Detailed information about {selectedCustomer.name}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="h-10 w-10 text-slate-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Full Name</p>
                      <p>{selectedCustomer.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p>{selectedCustomer.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="capitalize">{selectedCustomer.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p>
                        {userDetails[selectedCustomer.id as keyof typeof userDetails]?.phone || 'Not provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p>
                        {userDetails[selectedCustomer.id as keyof typeof userDetails]?.address || 'Not provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Registered On</p>
                      <p>
                        {userDetails[selectedCustomer.id as keyof typeof userDetails]
                          ? new Date(userDetails[selectedCustomer.id as keyof typeof userDetails].registered).toLocaleDateString()
                          : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Activity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-md">
                      <p className="text-sm text-slate-500">Orders</p>
                      <p className="text-lg font-medium">
                        {userDetails[selectedCustomer.id as keyof typeof userDetails]?.orderCount || getOrderCount(selectedCustomer.id)}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <p className="text-sm text-slate-500">Total Spend</p>
                      <p className="text-lg font-medium">
                        ₹{(userDetails[selectedCustomer.id as keyof typeof userDetails]?.totalSpent || getTotalSpend(selectedCustomer.id)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </RequireAuth>
  );
};

export default AdminCustomers;
