
import mongoose from 'mongoose';

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

// For client-side rendering in browsers
let Product;

try {
  // Check if mongoose.models exists before accessing it
  Product = mongoose.models?.Product || mongoose.model('Product', ProductSchema);
} catch (error) {
  // If error occurs, create a new model
  Product = mongoose.model('Product', ProductSchema);
}

export default Product;
