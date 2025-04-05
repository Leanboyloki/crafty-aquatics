
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

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
