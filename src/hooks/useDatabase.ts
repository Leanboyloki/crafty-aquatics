
import { useEffect, useState } from 'react';
import { seedDatabase } from '@/utils/seedData';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // This will connect to MongoDB and seed initial data if needed
        await seedDatabase();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsError(true);
      }
    };

    initializeDatabase();
  }, []);

  return { isInitialized, isError };
};
