import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDatabase } from "./hooks/useDatabase";

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

const queryClient = new QueryClient();

const AppContent = () => {
  const { isInitialized, isError } = useDatabase();

  // You could show a loading state here while database initializes
  if (!isInitialized && !isError) {
    return <div className="flex items-center justify-center h-screen">Initializing database...</div>;
  }

  // Show error message if database initialization failed
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Database Connection Error</h1>
          <p className="mt-2">Failed to connect to the database. Please check your MongoDB connection.</p>
          <p className="mt-4">
            Make sure to update the MongoDB connection string in <code>src/lib/mongodb.ts</code>
          </p>
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
