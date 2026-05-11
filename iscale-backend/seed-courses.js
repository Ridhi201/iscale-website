require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const courses = [
  { 
    title: 'AI Cohort Course Batch 01', 
    subtitle: 'Complete AI Guide for Everyone', 
    price: '₹4,999', 
    originalPrice: '₹14,999', 
    category: 'premium',
    image: '🤖', 
    color: '#1a1a2e',
    tag: 'LIVE'
  },
  { 
    title: 'Complete AI Guide', 
    subtitle: 'For Everyone', 
    price: '₹2,999', 
    originalPrice: '₹9,999', 
    category: 'premium',
    image: '💻', 
    color: '#16213e',
    tag: 'APP + WEB'
  },
  { 
    title: 'Data Science Masters', 
    subtitle: 'From Beginner to Pro', 
    price: '₹5,999', 
    originalPrice: '₹18,999', 
    category: 'premium',
    image: '📊', 
    color: '#0f3460',
    tag: 'POPULAR'
  },
  { 
    title: 'Business Analytics', 
    subtitle: 'Complete Course', 
    price: '₹3,499', 
    originalPrice: '₹11,999', 
    category: 'free',
    image: '📈', 
    color: '#533483',
    tag: 'NEW'
  },
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iscale');
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log('✅ Courses seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding courses:', err);
    process.exit(1);
  }
};

seedCourses();
