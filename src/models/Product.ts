
import mongoose from 'mongoose';

// Detect environment
const isClient = typeof window !== 'undefined';

// Define the schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fish', 'plants', 'equipment', 'decoration']
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  currency: {
    type: String,
    required: true,
    default: '₹'
  }
}, {
  timestamps: true
});

// Handle model compilation based on environment
let Product;

// For browser environment, use a placeholder
if (isClient) {
  // Create a mock model that won't actually connect to MongoDB
  const mockModel = {
    find: () => Promise.resolve([]),
    findById: () => Promise.resolve(null),
    create: (data) => Promise.resolve({ _id: Date.now().toString(), ...data }),
    findByIdAndUpdate: () => Promise.resolve({}),
    findByIdAndDelete: () => Promise.resolve({}),
  };
  
  Product = mockModel;
} else {
  // For server environment, use actual Mongoose model
  try {
    // Check if model is already defined to prevent OverwriteModelError
    Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
  } catch (error) {
    console.error("Error creating Product model:", error);
    Product = mongoose.model('Product', ProductSchema);
  }
}

export default Product;
