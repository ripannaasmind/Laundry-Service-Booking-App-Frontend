const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const Coupon = require('../models/Coupon.model');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { user: req.user._id };
    if (status && status !== 'all') {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('items.service', 'name slug');

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.service', 'name slug images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      items,
      pickupAddress,
      deliveryAddress,
      pickupDate,
      pickupTimeSlot,
      deliveryDate,
      deliveryTimeSlot,
      couponCode,
      paymentMethod,
      notes
    } = req.body;

    // Calculate totals
    let subtotal = 0;
    let totalItems = 0;

    items.forEach(item => {
      item.items.forEach(i => {
        subtotal += i.price * i.quantity;
        totalItems += i.quantity;
      });
    });

    // Apply coupon if provided
    let discount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() }
      });

      if (coupon && subtotal >= coupon.minOrderValue) {
        if (coupon.discountType === 'percentage') {
          discount = (subtotal * coupon.discountValue) / 100;
          if (coupon.maxDiscount) {
            discount = Math.min(discount, coupon.maxDiscount);
          }
        } else {
          discount = coupon.discountValue;
        }

        // Update coupon usage
        coupon.usedCount += 1;
        coupon.usedBy.push({ user: req.user._id });
        await coupon.save();
      }
    }

    // Calculate delivery charge (can be customized based on settings)
    const deliveryCharge = subtotal >= 50 ? 0 : 5;
    
    // Calculate tax
    const taxRate = 0.05; // 5%
    const tax = (subtotal - discount) * taxRate;
    
    const totalAmount = subtotal - discount + deliveryCharge + tax;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalItems,
      subtotal,
      discount,
      couponCode,
      deliveryCharge,
      tax,
      totalAmount,
      pickupAddress,
      deliveryAddress,
      pickupDate,
      pickupTimeSlot,
      deliveryDate,
      deliveryTimeSlot,
      paymentMethod,
      notes: { customer: notes },
      statusHistory: [{
        status: 'pending',
        note: 'Order placed'
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled
    const nonCancellableStatuses = ['in_process', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
    if (nonCancellableStatuses.includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.status = 'cancelled';
    order.cancellationReason = req.body.reason || 'Cancelled by user';
    order.statusHistory.push({
      status: 'cancelled',
      note: req.body.reason || 'Cancelled by user'
    });

    // Handle refund if paid
    if (order.paymentStatus === 'paid') {
      order.refundStatus = 'pending';
      order.refundAmount = order.totalAmount;
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: error.message
    });
  }
});

// @route   POST /api/orders/:id/reorder
// @desc    Reorder (create new order from existing)
// @access  Private
router.post('/:id/reorder', protect, async (req, res) => {
  try {
    const existingOrder = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Create new order with same items
    const newOrder = await Order.create({
      user: req.user._id,
      items: existingOrder.items,
      totalItems: existingOrder.totalItems,
      subtotal: existingOrder.subtotal,
      discount: 0, // Reset discount
      deliveryCharge: existingOrder.deliveryCharge,
      tax: existingOrder.tax,
      totalAmount: existingOrder.subtotal + existingOrder.deliveryCharge + existingOrder.tax,
      pickupAddress: existingOrder.pickupAddress,
      deliveryAddress: existingOrder.deliveryAddress,
      pickupDate: req.body.pickupDate,
      deliveryDate: req.body.deliveryDate,
      paymentMethod: req.body.paymentMethod || existingOrder.paymentMethod,
      statusHistory: [{
        status: 'pending',
        note: 'Order placed (reorder)'
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Reorder placed successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating reorder',
      error: error.message
    });
  }
});

// @route   GET /api/orders/track/:orderId
// @desc    Track order by order ID
// @access  Private
router.get('/track/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      user: req.user._id
    }).populate('deliveryPerson', 'firstName lastName phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order: {
        orderId: order.orderId,
        status: order.status,
        statusHistory: order.statusHistory,
        pickupDate: order.pickupDate,
        deliveryDate: order.deliveryDate,
        actualPickupDate: order.actualPickupDate,
        actualDeliveryDate: order.actualDeliveryDate,
        deliveryPerson: order.deliveryPerson
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error tracking order',
      error: error.message
    });
  }
});

module.exports = router;
