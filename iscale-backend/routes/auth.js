const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const authMiddleware = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

const JWT_SECRET = process.env.JWT_SECRET || 'iscale_jwt_secret_2024';

// Helper: Generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// @route   POST /api/auth/register
// @desc    Register a new user and send OTP
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, contact, whatsapp, gender, password } = req.body;

    if (!firstName || !lastName || !email || !contact || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { contact }] });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: 'User with this email or contact already exists.' });
      }
      // If not verified, delete the old record and let them re-register
      await User.deleteOne({ _id: existingUser._id });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (unverified)
    const user = new User({
      firstName, lastName, email, contact,
      whatsapp: whatsapp || contact,
      gender: gender || 'male',
      password: hashedPassword,
      isVerified: false
    });
    await user.save();

    // Generate OTP (6 digit), valid for 10 minutes
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Delete any existing OTP for this contact
    await Otp.deleteMany({ contact });
    await new Otp({ contact, otp, expiresAt }).save();

    // Send OTP via Email
    try {
      await sendEmail({
        email,
        subject: 'iScale Account Verification OTP',
        message: `Your OTP for account verification is: ${otp}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #900;">Welcome to iScale!</h2>
            <p>Thank you for registering. Please use the following OTP to verify your account:</p>
            <div style="font-size: 24px; font-weight: bold; color: #900; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This OTP is valid for 10 minutes.</p>
            <hr style="border: none; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #888;">If you did not request this, please ignore this email.</p>
          </div>
        `
      });
      console.log(`\n📧 OTP Email sent to ${email}\n`);
    } catch (emailError) {
      console.error('Email sending failed. Make sure you added your App Password in .env:', emailError.message);
    }

    res.status(201).json({
      message: 'Registration successful! Please check your email for the OTP.',
      email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and activate account
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    // Find the user by email
    const userRecord = await User.findOne({ email });
    if (!userRecord) return res.status(404).json({ message: 'User not found.' });

    const otpRecord = await Otp.findOne({ contact: userRecord.contact, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP. Please try again.' });
    }

    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired. Please register again.' });
    }

    // Mark user as verified
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Delete OTP record
    await Otp.deleteOne({ _id: otpRecord._id });

    // Issue JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Account verified successfully!',
      token,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// @route   GET /api/auth/profile
// @desc    Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   POST /api/auth/resend-otp
// @desc    Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No registration found for this email.' });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: 'This email is already verified.' });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await Otp.deleteMany({ contact: user.contact });
    await new Otp({ contact: user.contact, otp, expiresAt }).save();

    console.log(`\n📧 Resending OTP Email to ${email}: ${otp}\n`);

    try {
      await sendEmail({
        email,
        subject: 'Your New iScale Verification OTP',
        message: `Your new OTP is: ${otp}`,
        html: `<p>Your new OTP for account verification is: <b>${otp}</b></p>`
      });
    } catch (emailError) {
      console.error('Email Resend failed:', emailError.message);
    }

    res.json({ message: 'OTP resent successfully to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   POST /api/auth/login
// @desc    Login with contact/email + password
router.post('/login', async (req, res) => {
  try {
    const { credential, password } = req.body;

    if (!credential || !password) {
      return res.status(400).json({ message: 'Please provide your email/mobile and password.' });
    }

    // Find user by email or contact
    const user = await User.findOne({
      $or: [{ email: credential }, { contact: credential }]
    });

    if (!user) {
      return res.status(400).json({ message: 'No account found with this email or mobile number.' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email address first.', needsVerification: true, email: user.email });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password. Please try again.' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ message: 'Login successful!', token, user: userObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const {
      parentName, altContact, dob, state, city,
      pincode, address, skill, biography, firstName, lastName, whatsapp, gender
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          parentName, altContact, dob, state, city,
          pincode, address, skill, biography, firstName, lastName, whatsapp, gender
        }
      },
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found.' });

    res.json({ message: 'Profile updated successfully!', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating profile.' });
  }
});

module.exports = router;
