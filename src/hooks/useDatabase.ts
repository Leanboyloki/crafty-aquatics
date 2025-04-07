
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
        // This will connect to MongoDB and seed initial data if needed
        await seedDatabase();
        console.log("Database initialized successfully");
        setIsInitialized(true);
        toast.success("Database connected successfully");
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsError(true);
        toast.error("Failed to connect to the database. Check console for details.");
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
        toast.error("Database connection timed out. Loading app without DB connection.");
        console.warn("Database connection timed out, continuing without DB connection");
      }
    }, 5000);

    initializeDatabase();

    return () => clearTimeout(timeoutId);
  }, []);

  return { isInitialized, isLoading, isError };
};
