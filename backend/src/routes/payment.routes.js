const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// @route   POST /api/payments/create-intent
// @desc    Create payment intent (for Stripe integration)
// @access  Private
router.post('/create-intent', protect, async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    // In production, integrate with Stripe or other payment gateway
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100,
    //   currency,
    // });

    // Mock response for demo
    res.json({
      success: true,
      clientSecret: 'mock_client_secret_' + Date.now(),
      paymentIntentId: 'pi_' + Date.now()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment intent',
      error: error.message
    });
  }
});

// @route   POST /api/payments/confirm
// @desc    Confirm payment
// @access  Private
router.post('/confirm', protect, async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    // Update order payment status
    const Order = require('../models/Order.model');
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
      'paymentDetails.transactionId': paymentIntentId,
      'paymentDetails.paidAt': new Date(),
      'paymentDetails.method': 'card'
    });

    res.json({
      success: true,
      message: 'Payment confirmed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error confirming payment',
      error: error.message
    });
  }
});

// @route   GET /api/payments/history
// @desc    Get payment history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const Order = require('../models/Order.model');
    const payments = await Order.find({
      user: req.user._id,
      paymentStatus: { $in: ['paid', 'refunded'] }
    })
      .select('orderId totalAmount paymentStatus paymentDetails createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment history',
      error: error.message
    });
  }
});

module.exports = router;
