const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: ['customer', 'service_provider'],
    default: 'customer'
  },
  authProvider: {
    type: String,
    enum: ['email', 'google', 'firebase'],
    default: 'email'
  },
  firebaseUID: {
    type: String,
    sparse: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);