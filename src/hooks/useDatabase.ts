
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
      } finally {
        setIsLoading(false);
      }
    };

    initializeDatabase();
  }, []);

  return { isInitialized, isLoading, isError };
};
