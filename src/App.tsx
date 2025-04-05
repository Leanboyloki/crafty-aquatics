
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDatabase } from "./hooks/useDatabase";
import { Loader2 } from "lucide-react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import UserOrders from "./pages/UserOrders";
import Unauthorized from "./pages/Unauthorized";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { isInitialized, isLoading, isError } = useDatabase();

  // Always show a loading indicator during initial load
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="glass-card p-10 rounded-xl text-center max-w-md">
          <Loader2 className="h-12 w-12 mx-auto animate-spin text-aqua-500 mb-4" />
          <h2 className="text-2xl font-bold text-aqua-400 mb-2">Connecting to Database</h2>
          <p className="text-gray-300">Setting up your aquatic experience...</p>
        </div>
      </div>
    );
  }

  // Show error message if database initialization failed
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="glass-card p-10 rounded-xl text-center max-w-md border-red-500/30">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Database Connection Error</h1>
          <p className="text-gray-300 mb-4">Failed to connect to the database. Please check your MongoDB connection.</p>
          <div className="bg-gray-800/60 p-4 rounded-md text-left mb-4">
            <p className="text-sm text-gray-400 font-mono">
              Make sure to update the MongoDB connection string in <code className="text-amber-400">src/lib/mongodb.ts</code>
            </p>
          </div>
          <p className="text-sm text-gray-400">Check the console for more details.</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* User Routes (Protected) */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<UserOrders />} />
        
        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        
        {/* Other Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppContent />
            </TooltipProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
