
import mongoose from 'mongoose';

// Detect environment
const isClient = typeof window !== 'undefined';

// Define the schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Handle model compilation based on environment
let User;

// For browser environment, use a placeholder
if (isClient) {
  // Create a mock model that won't actually connect to MongoDB
  const mockModel = {
    find: () => Promise.resolve([]),
    findOne: () => Promise.resolve(null),
    create: (data) => Promise.resolve({ _id: Date.now().toString(), ...data }),
    findByIdAndUpdate: () => Promise.resolve({}),
  };
  
  User = mockModel;
} else {
  // For server environment, use actual Mongoose model
  try {
    // Check if model is already defined to prevent OverwriteModelError
    User = mongoose.models.User || mongoose.model('User', UserSchema);
  } catch (error) {
    console.error("Error creating User model:", error);
    User = mongoose.model('User', UserSchema);
  }
}

export default User;
