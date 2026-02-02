const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Order = require('../models/Order.model');
const Service = require('../models/Service.model');
const Coupon = require('../models/Coupon.model');
const Review = require('../models/Review.model');
const { protect, adminOnly, staffOrAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Apply auth middleware to all routes
router.use(protect);
router.use(staffOrAdmin);

// ==================== DASHBOARD ====================

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Admin/Staff
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    // Total counts
    const totalOrders = await Order.countDocuments();
    const todaysOrders = await Order.countDocuments({ createdAt: { $gte: today } });
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });
    const totalCustomers = await User.countDocuments({ role: 'user' });

    // Revenue
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const monthlyRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid', createdAt: { $gte: thisMonth } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'firstName lastName email');

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Monthly chart data (last 6 months)
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    const monthlyData = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] } }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalOrders,
          todaysOrders,
          pendingOrders,
          completedOrders,
          cancelledOrders,
          totalCustomers,
          totalRevenue: totalRevenue[0]?.total || 0,
          monthlyRevenue: monthlyRevenue[0]?.total || 0
        },
        recentOrders,
        ordersByStatus,
        monthlyData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

// ==================== USER MANAGEMENT ====================

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Admin
router.get('/users', adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role, status } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) query.role = role;
    if (status === 'blocked') query.isBlocked = true;
    if (status === 'active') query.isBlocked = false;

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// @route   GET /api/admin/users/:id
// @desc    Get user details with order history
// @access  Admin
router.get('/users/:id', adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const orders = await Order.find({ user: req.params.id })
      .sort({ createdAt: -1 })
      .limit(20);

    const orderStats = await Order.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] } }
        }
      }
    ]);

    res.json({
      success: true,
      user,
      orders,
      stats: orderStats[0] || { totalOrders: 0, totalSpent: 0 }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/users/:id/block
// @desc    Block/Unblock user
// @access  Admin
router.put('/users/:id/block', adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      success: true,
      message: user.isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/users/:id/wallet
// @desc    Adjust user wallet
// @access  Admin
router.put('/users/:id/wallet', adminOnly, async (req, res) => {
  try {
    const { type, amount, description } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (type === 'credit') {
      user.wallet.balance += amount;
    } else {
      if (user.wallet.balance < amount) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient wallet balance'
        });
      }
      user.wallet.balance -= amount;
    }

    user.wallet.transactions.push({
      type,
      amount,
      description: description || `Admin ${type}`
    });

    await user.save();

    res.json({
      success: true,
      message: 'Wallet updated successfully',
      wallet: user.wallet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating wallet',
      error: error.message
    });
  }
});

// ==================== ORDER MANAGEMENT ====================

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Admin/Staff
router.get('/orders', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search, startDate, endDate, paymentStatus } = req.query;
    
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } }
      ];
    }
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('user', 'firstName lastName email phone')
      .populate('deliveryPerson', 'firstName lastName phone');

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

// @route   GET /api/admin/orders/:id
// @desc    Get order details
// @access  Admin/Staff
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email phone')
      .populate('items.service')
      .populate('deliveryPerson', 'firstName lastName phone');

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

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Admin/Staff
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status, note } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    order.statusHistory.push({
      status,
      note,
      updatedBy: req.user._id
    });

    // Update actual dates
    if (status === 'picked_up') order.actualPickupDate = new Date();
    if (status === 'delivered') order.actualDeliveryDate = new Date();

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/orders/:id/assign
// @desc    Assign delivery person
// @access  Admin/Staff
router.put('/orders/:id/assign', async (req, res) => {
  try {
    const { deliveryPersonId } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryPerson: deliveryPersonId },
      { new: true }
    ).populate('deliveryPerson', 'firstName lastName phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Delivery person assigned',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assigning delivery person',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/orders/:id/refund
// @desc    Process refund
// @access  Admin
router.put('/orders/:id/refund', adminOnly, async (req, res) => {
  try {
    const { amount } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.refundAmount = amount || order.totalAmount;
    order.refundStatus = 'processed';
    order.statusHistory.push({
      status: order.status,
      note: `Refund processed: $${order.refundAmount}`,
      updatedBy: req.user._id
    });

    await order.save();

    res.json({
      success: true,
      message: 'Refund processed',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing refund',
      error: error.message
    });
  }
});

// ==================== SERVICE MANAGEMENT ====================

// @route   GET /api/admin/services
// @desc    Get all services (including inactive)
// @access  Admin
router.get('/services', adminOnly, async (req, res) => {
  try {
    const services = await Service.find().sort('sortOrder');
    res.json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
});

// @route   POST /api/admin/services
// @desc    Create service
// @access  Admin
router.post('/services', adminOnly, upload.array('images', 5), async (req, res) => {
  try {
    const serviceData = { ...req.body };
    
    // Handle items JSON
    if (req.body.items) {
      serviceData.items = JSON.parse(req.body.items);
    }
    if (req.body.features) {
      serviceData.features = JSON.parse(req.body.features);
    }

    // Handle images
    if (req.files && req.files.length > 0) {
      serviceData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const service = await Service.create(serviceData);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating service',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/services/:id
// @desc    Update service
// @access  Admin
router.put('/services/:id', adminOnly, upload.array('images', 5), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.body.items) {
      updateData.items = JSON.parse(req.body.items);
    }
    if (req.body.features) {
      updateData.features = JSON.parse(req.body.features);
    }
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/services/:id/toggle
// @desc    Toggle service active status
// @access  Admin
router.put('/services/:id/toggle', adminOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    service.isActive = !service.isActive;
    await service.save();

    res.json({
      success: true,
      message: service.isActive ? 'Service enabled' : 'Service disabled',
      service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling service',
      error: error.message
    });
  }
});

// @route   DELETE /api/admin/services/:id
// @desc    Delete service
// @access  Admin
router.delete('/services/:id', adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
});

// ==================== DELIVERY MANAGEMENT ====================

// @route   GET /api/admin/delivery-staff
// @desc    Get all delivery staff
// @access  Admin
router.get('/delivery-staff', adminOnly, async (req, res) => {
  try {
    const staff = await User.find({ role: 'delivery' });
    res.json({
      success: true,
      count: staff.length,
      staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching delivery staff',
      error: error.message
    });
  }
});

// @route   POST /api/admin/delivery-staff
// @desc    Add delivery staff
// @access  Admin
router.post('/delivery-staff', adminOnly, async (req, res) => {
  try {
    const staffData = {
      ...req.body,
      role: 'delivery'
    };

    const staff = await User.create(staffData);

    res.status(201).json({
      success: true,
      message: 'Delivery staff added',
      staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding delivery staff',
      error: error.message
    });
  }
});

// @route   GET /api/admin/delivery-report
// @desc    Get delivery history report
// @access  Admin
router.get('/delivery-report', adminOnly, async (req, res) => {
  try {
    const { startDate, endDate, deliveryPersonId } = req.query;
    
    const query = { status: 'delivered' };
    if (deliveryPersonId) query.deliveryPerson = deliveryPersonId;
    if (startDate || endDate) {
      query.actualDeliveryDate = {};
      if (startDate) query.actualDeliveryDate.$gte = new Date(startDate);
      if (endDate) query.actualDeliveryDate.$lte = new Date(endDate);
    }

    const deliveries = await Order.find(query)
      .populate('deliveryPerson', 'firstName lastName')
      .populate('user', 'firstName lastName');

    res.json({
      success: true,
      count: deliveries.length,
      deliveries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching delivery report',
      error: error.message
    });
  }
});

module.exports = router;
