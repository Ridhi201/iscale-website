const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  price: { type: String, required: true },
  originalPrice: { type: String },
  category: { type: String, enum: ['premium', 'free'], default: 'premium' },
  image: { type: String }, // This can be an emoji or URL
  color: { type: String, default: '#1a1a2e' },
  tag: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
