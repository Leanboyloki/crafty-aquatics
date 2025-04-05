
import mongoose from 'mongoose';

// MongoDB connection string should be stored as an environment variable in production
// For demonstration purposes, we'll use a placeholder
const MONGODB_URI = 'YOUR_MONGODB_CONNECTION_STRING_HERE';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Mongoose models
// These will be imported in the service layer
