
import mongoose from 'mongoose';

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

// For client-side rendering in browsers
let User;

try {
  // Check if mongoose.models exists before accessing it
  User = mongoose.models?.User || mongoose.model('User', UserSchema);
} catch (error) {
  // If error occurs, create a new model
  User = mongoose.model('User', UserSchema);
}

export default User;
