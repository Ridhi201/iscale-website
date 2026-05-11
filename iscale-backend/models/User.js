const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, unique: true },
  whatsapp: { type: String },
  gender: { type: String },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  
  // Additional profile fields
  parentName: { type: String, default: '' },
  altContact: { type: String, default: '' },
  dob: { type: String, default: '' },
  state: { type: String, default: '' },
  city: { type: String, default: '' },
  pincode: { type: String, default: '' },
  address: { type: String, default: '' },
  skill: { type: String, default: '' },
  biography: { type: String, default: '' },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
