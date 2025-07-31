const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: 'users'
});

const User = mongoose.model('User', UserSchema);

// Add user function
const addUser = async () => {
  try {
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'jom@hrpsolutions.com' });
    if (existingUser) {
      console.log('User already exists:', existingUser.email);
      return;
    }
    
    // Create user with the password from SQL file
    const user = await User.create({
      email: 'jom@hrpsolutions.com',
      password: '$2b$10$TLuHJMlumucZQ7YBN6PtbuMt4oX0AdmEx1.h7RlN3pxUDA1U5uVCG',
      salt: '$2b$10$TLuHJMlumucZQ7YBN6Ptbu',
      verified: false,
      isAdmin: false
    });
    
    console.log('User created successfully:', user.email);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

addUser(); 