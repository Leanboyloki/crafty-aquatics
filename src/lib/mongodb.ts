
import mongoose from 'mongoose';

// Detect environment
const isClient = typeof window !== 'undefined';

// MongoDB connection string (stored as env variable in production)
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb+srv://demo-user:demo-password@demo-cluster.mongodb.net/aquahaven?retryWrites=true&w=majority';

// Mock connection object for client-side rendering
const mockConnection = {
  connection: { readyState: 1 },
  isConnected: true,
  isClient: true
};

// Cache object to avoid multiple connections
let cached = {
  conn: null,
  promise: null
};

/**
 * Connects to MongoDB database
 * Returns mock connection in browser environment
 */
export async function connectToDatabase() {
  // If in browser environment, return mock connection
  if (isClient) {
    console.log('Browser environment detected, using mock connection');
    return mockConnection;
  }

  // Return cached connection if exists
  if (cached.conn) {
    return cached.conn;
  }

  // Establish new connection if not cached
  if (!cached.promise) {
    mongoose.set('strictQuery', false);
    
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        cached.promise = null;
        throw err;
      });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}
