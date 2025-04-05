
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
        <div className="max-w-md text-center glass-card p-8 rounded-xl">
          <div className="mx-auto w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mb-6 neon-border border-destructive/50">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2 text-foreground">Access Denied</h1>
          
          <p className="text-muted-foreground mb-6">
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
                  variant="gradient"
                  className="w-full" 
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-coral-400/50 text-coral-400 hover:bg-coral-500/20"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="gradient"
                className="w-full bg-gradient-to-r from-coral-500 to-coral-400"
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
