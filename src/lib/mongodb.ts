
import mongoose from 'mongoose';

// MongoDB connection string 
// For demonstration purposes, we're using a placeholder connection
// In production, this should be stored as an environment variable
// Replace this with your actual MongoDB Atlas connection string
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb+srv://demo-user:demo-password@demo-cluster.mongodb.net/aquahaven?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable'
  );
}

/**
 * We create a cached connection object to avoid creating multiple
 * connections during hot reloads in development
 */
let cached = {
  conn: null,
  promise: null
};

// Handle client-side rendering environment
if (typeof window !== 'undefined') {
  // We're in a browser - initialize mongoose for browser environment
  mongoose.set('strictQuery', false);
  
  // Reset cached connection
  cached = { conn: null, promise: null };
  
  console.log('Mongoose setup for browser environment');
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  // In browser environment, we should return a mock connection
  // to prevent actual connection attempts
  if (typeof window !== 'undefined') {
    console.log('Browser environment detected, returning mock connection');
    // Return a mock connection object that won't attempt actual MongoDB connections
    return { connection: { readyState: 1 } };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
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
