
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="h-12 w-12 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          
          <p className="text-gray-600 mb-6">
            {user ? (
              <>
                Sorry, you don't have permission to access this page. 
                This area requires administrator privileges.
              </>
            ) : (
              <>
                You need to be logged in to access this page.
              </>
            )}
          </p>
          
          <div className="space-y-4">
            {user ? (
              <>
                <Button 
                  className="w-full bg-aqua-600 hover:bg-aqua-700"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-aqua-600 hover:bg-aqua-700"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Unauthorized;
