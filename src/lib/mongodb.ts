
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
// Use window object for browser environment 
let cached = {
  conn: null,
  promise: null
};

// For client-side rendering, we reset the connection on each load
// This prevents issues with browser refreshes
if (typeof window !== 'undefined') {
  cached = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
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
