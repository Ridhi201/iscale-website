const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/courses
// @desc    Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/courses/enroll/:id
// @desc    Enroll in a course
router.post('/enroll/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if already enrolled
    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(course._id);
    await user.save();

    res.json({ message: 'Enrolled successfully', courseId: course._id });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
