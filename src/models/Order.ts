
import mongoose from 'mongoose';

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

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
