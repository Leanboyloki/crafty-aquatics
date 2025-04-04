
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ShoppingBag, DollarSign, BarChart3, ArrowUp, ArrowDown, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequireAuth from '@/components/RequireAuth';
import { useProducts } from '@/context/ProductContext';
import { useOrders } from '@/context/OrderContext';

const Dashboard = () => {
  const { products } = useProducts();
  const { orders } = useOrders();
  
  // Calculate some metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalCustomers = [...new Set(orders.map(order => order.userId))].length;
  
  // Mock monthly data
  const monthlyData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2400 },
    { month: 'Apr', revenue: 2000 },
    { month: 'May', revenue: 2600 },
    { month: 'Jun', revenue: 3200 },
  ];
  
  // Product category distribution
  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalProducts = products.length;
  const categoryPercentages = Object.entries(categoryCount).map(([category, count]) => ({
    category,
    percentage: (count / totalProducts) * 100
  }));

  return (
    <RequireAuth allowedRoles={['admin']}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            
            <div className="mt-4 md:mt-0 space-x-2">
              <Link 
                to="/admin/products/add" 
                className="inline-flex items-center px-4 py-2 bg-aqua-600 text-white rounded-md hover:bg-aqua-700 transition-colors"
              >
                Add Product
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">₹{totalRevenue.toFixed(2)}</h3>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">12%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <h3 className="text-2xl font-bold mt-1">{orders.length}</h3>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">8%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                    <h3 className="text-2xl font-bold mt-1">{pendingOrders}</h3>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Package className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">5%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Customers</p>
                    <h3 className="text-2xl font-bold mt-1">{totalCustomers}</h3>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">15%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between">
                  {monthlyData.map((data, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="w-10 bg-aqua-600 rounded-t-md" 
                        style={{ height: `${data.revenue / 40}px` }}
                      ></div>
                      <span className="text-xs mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Distribution of products by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPercentages.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium capitalize">{item.category}</span>
                        <span className="text-sm text-gray-500">{Math.round(item.percentage)}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="orders">
                <TabsList className="mb-6">
                  <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                  <TabsTrigger value="products">Low Stock Products</TabsTrigger>
                  <TabsTrigger value="customers">Customer Registrations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="orders">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-slate-50">
                          <th className="px-4 py-3 text-left">Order ID</th>
                          <th className="px-4 py-3 text-left">Customer</th>
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order, i) => (
                          <tr key={i} className="border-b">
                            <td className="px-4 py-3 font-medium">#{order.id}</td>
                            <td className="px-4 py-3">User {order.userId}</td>
                            <td className="px-4 py-3">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">₹{order.total.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-right">
                    <Link to="/admin/orders" className="text-aqua-600 hover:text-aqua-800 text-sm font-medium">
                      View all orders →
                    </Link>
                  </div>
                </TabsContent>
                
                <TabsContent value="products">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-slate-50">
                          <th className="px-4 py-3 text-left">Product</th>
                          <th className="px-4 py-3 text-left">Category</th>
                          <th className="px-4 py-3 text-right">Stock</th>
                          <th className="px-4 py-3 text-right">Price</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products
                          .filter(p => p.stock < 20)
                          .sort((a, b) => a.stock - b.stock)
                          .slice(0, 5)
                          .map((product, i) => (
                            <tr key={i} className="border-b">
                              <td className="px-4 py-3 font-medium">{product.name}</td>
                              <td className="px-4 py-3 capitalize">{product.category}</td>
                              <td className={`px-4 py-3 text-right ${
                                product.stock < 5 ? 'text-red-600 font-medium' : 'text-yellow-600'
                              }`}>
                                {product.stock}
                              </td>
                              <td className="px-4 py-3 text-right">₹{product.price.toFixed(2)}</td>
                              <td className="px-4 py-3 text-right">
                                <Link to={`/admin/products/edit/${product.id}`}>
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-right">
                    <Link to="/admin/products" className="text-aqua-600 hover:text-aqua-800 text-sm font-medium">
                      Manage products →
                    </Link>
                  </div>
                </TabsContent>
                
                <TabsContent value="customers">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-slate-50">
                          <th className="px-4 py-3 text-left">ID</th>
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-left">Email</th>
                          <th className="px-4 py-3 text-left">Registration Date</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* We'll display mock user data here */}
                        {[
                          { id: '1', name: 'Admin User', email: 'admin@aqua.com', date: '2024-01-15' },
                          { id: '2', name: 'Test User', email: 'user@aqua.com', date: '2024-02-20' },
                          { id: '3', name: 'John Smith', email: 'john@example.com', date: '2024-03-05' },
                          { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', date: '2024-03-18' },
                          { id: '5', name: 'Michael Brown', email: 'michael@example.com', date: '2024-04-02' },
                        ].map((user, i) => (
                          <tr key={i} className="border-b">
                            <td className="px-4 py-3 font-medium">#{user.id}</td>
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{new Date(user.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-right">
                              <Link to={`/admin/customers`}>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                  <Users className="h-4 w-4" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-right">
                    <Link to="/admin/customers" className="text-aqua-600 hover:text-aqua-800 text-sm font-medium">
                      View all customers →
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </RequireAuth>
  );
};

export default Dashboard;
