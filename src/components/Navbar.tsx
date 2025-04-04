
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md text-foreground shadow-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold aqua-gradient bg-clip-text text-transparent">
            Crafty Aquatics
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-aqua-300 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="hover:text-aqua-300 transition-colors">
              Shop
            </Link>
            {user && (
              <Link to="/orders" className="hover:text-aqua-300 transition-colors">
                My Orders
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:text-aqua-300 transition-colors">
                Admin Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-coral-500 hover:bg-coral-600">
                  {itemCount}
                </Badge>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 hover:text-aqua-300 transition-colors">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <Button 
                  variant="gradient" 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="border-coral-400/50 text-coral-400 hover:bg-coral-500/20"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="gradient" 
                  className="bg-gradient-to-r from-coral-500 to-coral-400"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 mr-2">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-coral-500 hover:bg-coral-600">
                  {itemCount}
                </Badge>
              )}
            </Link>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md p-4 border-t border-border/50">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-foreground hover:text-aqua-300 py-2" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/shop" className="text-foreground hover:text-aqua-300 py-2" onClick={toggleMobileMenu}>
              Shop
            </Link>
            {user && (
              <Link to="/orders" className="text-foreground hover:text-aqua-300 py-2" onClick={toggleMobileMenu}>
                My Orders
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-foreground hover:text-aqua-300 py-2" onClick={toggleMobileMenu}>
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <>
                <Link to="/profile" className="text-foreground hover:text-aqua-300 py-2" onClick={toggleMobileMenu}>
                  Profile
                </Link>
                <Button 
                  variant="gradient" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    navigate('/login');
                    toggleMobileMenu();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-coral-400/50 text-coral-400 hover:bg-coral-500/20 w-full"
                  onClick={() => {
                    navigate('/login');
                    toggleMobileMenu();
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="gradient"
                  className="bg-gradient-to-r from-coral-500 to-coral-400 w-full" 
                  onClick={() => {
                    navigate('/register');
                    toggleMobileMenu();
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
