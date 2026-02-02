const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon.model');
const { protect, adminOnly } = require('../middleware/auth.middleware');

// @route   POST /api/coupons/validate
// @desc    Validate coupon code
// @access  Private
router.post('/validate', protect, async (req, res) => {
  try {
    const { code, orderTotal } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    });

    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired coupon code'
      });
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        message: 'Coupon usage limit exceeded'
      });
    }

    // Check user usage limit
    const userUsage = coupon.usedBy.filter(u => u.user.toString() === req.user._id.toString()).length;
    if (userUsage >= coupon.userUsageLimit) {
      return res.status(400).json({
        success: false,
        message: 'You have already used this coupon'
      });
    }

    // Check minimum order value
    if (orderTotal < coupon.minOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value is $${coupon.minOrderValue}`
      });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (orderTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        calculatedDiscount: discount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating coupon',
      error: error.message
    });
  }
});

// @route   GET /api/coupons/available
// @desc    Get available coupons for user
// @access  Private
router.get('/available', protect, async (req, res) => {
  try {
    const coupons = await Coupon.find({
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
      $or: [
        { usageLimit: null },
        { $expr: { $lt: ['$usedCount', '$usageLimit'] } }
      ]
    }).select('code description discountType discountValue minOrderValue maxDiscount validUntil');

    res.json({
      success: true,
      coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coupons',
      error: error.message
    });
  }
});

// ==================== ADMIN ROUTES ====================

// @route   GET /api/coupons/admin
// @desc    Get all coupons (admin)
// @access  Admin
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coupons',
      error: error.message
    });
  }
});

// @route   POST /api/coupons/admin
// @desc    Create coupon
// @access  Admin
router.post('/admin', protect, adminOnly, async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating coupon',
      error: error.message
    });
  }
});

// @route   PUT /api/coupons/admin/:id
// @desc    Update coupon
// @access  Admin
router.put('/admin/:id', protect, adminOnly, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.json({
      success: true,
      message: 'Coupon updated successfully',
      coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating coupon',
      error: error.message
    });
  }
});

// @route   DELETE /api/coupons/admin/:id
// @desc    Delete coupon
// @access  Admin
router.delete('/admin/:id', protect, adminOnly, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting coupon',
      error: error.message
    });
  }
});

module.exports = router;
