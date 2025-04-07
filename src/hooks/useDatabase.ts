
import { useEffect, useState } from 'react';
import { seedDatabase } from '@/utils/seedData';
import { toast } from "sonner";

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        setIsLoading(true);
        
        // Check if we're running in the browser
        if (typeof window !== 'undefined') {
          console.log("Browser environment detected, using local data");
          // For browser environment, we'll just use local data
          // We won't actually connect to MongoDB from the browser
          
          // Small delay to simulate "connecting"
          await new Promise(resolve => setTimeout(resolve, 500));
          
          setIsInitialized(true);
          toast.success("Using local data for demonstration");
        } else {
          // This will connect to MongoDB and seed initial data if needed
          await seedDatabase();
          console.log("Database initialized successfully");
          setIsInitialized(true);
          toast.success("Database connected successfully");
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsError(true);
        toast.error("Failed to connect to the database. Using local data instead.");
        // Mark as initialized anyway to allow the app to load without a DB connection
        setIsInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    // Set a timeout to ensure we don't block rendering indefinitely
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setIsInitialized(true);
        setIsError(true);
        toast.error("Database connection timed out. Using local data instead.");
        console.warn("Database connection timed out, continuing with local data");
      }
    }, 5000);

    initializeDatabase();

    return () => clearTimeout(timeoutId);
  }, []);

  return { isInitialized, isLoading, isError };
};
