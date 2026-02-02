const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const allowedFields = [
      'firstName', 'lastName', 'phone', 'altPhone', 'gender',
      'addressLine1', 'addressLine2', 'preferredLanguage', 'preferredCurrency'
    ];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

// @route   PUT /api/users/profile/image
// @desc    Update profile image
// @access  Private
router.put('/profile/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: imageUrl },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile image updated successfully',
      profileImage: imageUrl,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile image',
      error: error.message
    });
  }
});

// @route   PUT /api/users/notification-settings
// @desc    Update notification settings
// @access  Private
router.put('/notification-settings', protect, async (req, res) => {
  try {
    const { email, push, sms } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        notificationSettings: { email, push, sms }
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Notification settings updated',
      notificationSettings: user.notificationSettings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating notification settings',
      error: error.message
    });
  }
});

// @route   GET /api/users/wallet
// @desc    Get wallet balance and transactions
// @access  Private
router.get('/wallet', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('wallet');
    res.json({
      success: true,
      wallet: user.wallet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching wallet',
      error: error.message
    });
  }
});

module.exports = router;
