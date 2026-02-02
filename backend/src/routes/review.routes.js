const express = require('express');
const router = express.Router();
const Review = require('../models/Review.model');
const Order = require('../models/Order.model');
const { protect, adminOnly } = require('../middleware/auth.middleware');

// @route   GET /api/reviews
// @desc    Get approved reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { serviceId, page = 1, limit = 10 } = req.query;
    
    const query = { isApproved: true };
    if (serviceId) query.service = serviceId;

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('user', 'firstName lastName profileImage');

    const total = await Review.countDocuments(query);

    // Calculate average rating
    const avgRating = await Review.aggregate([
      { $match: query },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);

    res.json({
      success: true,
      count: reviews.length,
      total,
      averageRating: avgRating[0]?.avg || 0,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
});

// @route   POST /api/reviews
// @desc    Submit review
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { orderId, rating, title, comment, serviceId } = req.body;

    // Verify order belongs to user and is completed
    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id,
      status: 'delivered'
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'You can only review completed orders'
      });
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({ order: orderId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this order'
      });
    }

    const review = await Review.create({
      user: req.user._id,
      order: orderId,
      service: serviceId,
      rating,
      title,
      comment
    });

    // Update order with rating
    order.rating = { score: rating, review: comment, date: new Date() };
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting review',
      error: error.message
    });
  }
});

// @route   GET /api/reviews/my
// @desc    Get user's reviews
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('order', 'orderId');

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
});

// ==================== ADMIN ROUTES ====================

// @route   GET /api/reviews/admin
// @desc    Get all reviews (admin)
// @access  Admin
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status === 'pending') query.isApproved = false;
    if (status === 'approved') query.isApproved = true;

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('user', 'firstName lastName email')
      .populate('order', 'orderId');

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
});

// @route   PUT /api/reviews/admin/:id/approve
// @desc    Approve/reject review
// @access  Admin
router.put('/admin/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const { isApproved } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: isApproved ? 'Review approved' : 'Review rejected',
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
});

// @route   PUT /api/reviews/admin/:id/respond
// @desc    Admin respond to review
// @access  Admin
router.put('/admin/:id/respond', protect, adminOnly, async (req, res) => {
  try {
    const { message } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        adminResponse: {
          message,
          respondedAt: new Date(),
          respondedBy: req.user._id
        }
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Response added',
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error responding to review',
      error: error.message
    });
  }
});

module.exports = router;
