
import mongoose from 'mongoose';

// Detect environment
const isClient = typeof window !== 'undefined';

// Define the schemas
const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: String
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [OrderItemSchema],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  address: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'cashOnDelivery'
  }
}, {
  timestamps: true
});

// Handle model compilation based on environment
let Order;

// For browser environment, use a placeholder
if (isClient) {
  // Create a mock model that won't actually connect to MongoDB
  const mockModel = {
    find: () => Promise.resolve([]),
    findOne: () => Promise.resolve(null),
    create: (data) => Promise.resolve({ _id: Date.now().toString(), ...data, createdAt: new Date() }),
    findByIdAndUpdate: () => Promise.resolve({}),
  };
  
  Order = mockModel;
} else {
  // For server environment, use actual Mongoose model
  try {
    // Check if model is already defined to prevent OverwriteModelError
    Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
  } catch (error) {
    console.error("Error creating Order model:", error);
    Order = mongoose.model('Order', OrderSchema);
  }
}

export default Order;
