
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

// Check if the model exists before creating a new one
// This is important for hot module reloading in development
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
