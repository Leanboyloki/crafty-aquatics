
import { useEffect, useState } from 'react';
import { seedDatabase } from '@/utils/seedData';
import { toast } from "sonner";

// Default demo data for browser environment
const demoProducts = [
  {
    id: '1',
    name: 'Neon Tetra',
    description: 'A small, vibrant freshwater fish with a bright blue-green horizontal stripe.',
    price: 225,
    image: 'https://images.unsplash.com/photo-1545048984-94b9645723f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'fish',
    stock: 50,
    currency: '₹'
  },
  {
    id: '2',
    name: 'Amazon Sword Plant',
    description: 'A popular aquarium plant known for its sword-shaped leaves.',
    price: 375,
    image: 'https://images.unsplash.com/photo-1636597059968-7ea550a8f75a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'plants',
    stock: 30,
    currency: '₹'
  },
  {
    id: '3',
    name: 'Aquarium Filter',
    description: 'High-quality water filter for clean and healthy water.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1584553321868-5fe8a8010228?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'equipment',
    stock: 15,
    currency: '₹'
  },
  {
    id: '4',
    name: 'Decorative Castle',
    description: 'A beautiful castle decoration for your aquarium.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1581123303451-9a2f7bd2bd4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'decoration',
    stock: 10,
    currency: '₹'
  }
];

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        setIsLoading(true);
        
        // Browser environment - initialize local data
        if (isClient) {
          console.log("Browser environment detected, initializing local data");
          
          // Initialize local storage with demo products if not already present
          if (!localStorage.getItem('aquaProducts')) {
            localStorage.setItem('aquaProducts', JSON.stringify(demoProducts));
            console.log("Demo products added to local storage");
          }
          
          // Small delay to simulate "connecting"
          await new Promise(resolve => setTimeout(resolve, 300));
          
          setIsInitialized(true);
          toast.success("Using local data for demonstration");
        } 
        // Server environment - connect to MongoDB
        else {
          await seedDatabase();
          console.log("Database initialized successfully");
          setIsInitialized(true);
          toast.success("Database connected successfully");
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsError(true);
        
        // In case of error, still try to use local data
        if (isClient && !localStorage.getItem('aquaProducts')) {
          localStorage.setItem('aquaProducts', JSON.stringify(demoProducts));
        }
        
        toast.error("Database connection failed. Using local data instead.");
        
        // Mark as initialized anyway to allow the app to load
        setIsInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    // Set a shorter timeout to improve user experience
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setIsInitialized(true);
        
        if (isClient && !localStorage.getItem('aquaProducts')) {
          localStorage.setItem('aquaProducts', JSON.stringify(demoProducts));
        }
        
        setIsError(true);
        toast.error("Database initialization timed out. Using local data instead.");
      }
    }, 3000); // Shorter timeout for better UX

    initializeDatabase();
    return () => clearTimeout(timeoutId);
  }, []);

  return { isInitialized, isLoading, isError };
};
