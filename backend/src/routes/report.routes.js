const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const User = require('../models/User.model');
const { protect, adminOnly } = require('../middleware/auth.middleware');

// Apply admin middleware
router.use(protect);
router.use(adminOnly);

// @route   GET /api/reports/revenue
// @desc    Get revenue report
// @access  Admin
router.get('/revenue', async (req, res) => {
  try {
    const { period = 'monthly', startDate, endDate } = req.query;
    
    let groupBy;
    switch (period) {
      case 'daily':
        groupBy = { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, day: { $dayOfMonth: '$createdAt' } };
        break;
      case 'weekly':
        groupBy = { year: { $year: '$createdAt' }, week: { $week: '$createdAt' } };
        break;
      case 'monthly':
      default:
        groupBy = { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } };
    }

    const matchQuery = { paymentStatus: 'paid' };
    if (startDate) matchQuery.createdAt = { $gte: new Date(startDate) };
    if (endDate) matchQuery.createdAt = { ...matchQuery.createdAt, $lte: new Date(endDate) };

    const revenue = await Order.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    const totalRevenue = await Order.aggregate([
      { $match: matchQuery },
      { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      summary: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders: totalRevenue[0]?.count || 0
      },
      data: revenue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating revenue report',
      error: error.message
    });
  }
});

// @route   GET /api/reports/services
// @desc    Get service-wise report
// @access  Admin
router.get('/services', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const matchQuery = {};
    if (startDate || endDate) {
      matchQuery.createdAt = {};
      if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
      if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
    }

    const serviceReport = await Order.aggregate([
      { $match: matchQuery },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.serviceName',
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$items.subtotal' },
          totalItems: { $sum: { $sum: '$items.items.quantity' } }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.json({
      success: true,
      data: serviceReport
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating service report',
      error: error.message
    });
  }
});

// @route   GET /api/reports/customers
// @desc    Get customer activity report
// @access  Admin
router.get('/customers', async (req, res) => {
  try {
    const { startDate, endDate, limit = 20 } = req.query;

    const matchQuery = {};
    if (startDate || endDate) {
      matchQuery.createdAt = {};
      if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
      if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
    }

    const topCustomers = await Order.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$user',
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind: '$userInfo' },
      {
        $project: {
          _id: 1,
          totalOrders: 1,
          totalSpent: 1,
          avgOrderValue: 1,
          'userInfo.firstName': 1,
          'userInfo.lastName': 1,
          'userInfo.email': 1
        }
      }
    ]);

    const newCustomers = await User.countDocuments({
      role: 'user',
      createdAt: matchQuery.createdAt || { $exists: true }
    });

    res.json({
      success: true,
      newCustomers,
      topCustomers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating customer report',
      error: error.message
    });
  }
});

// @route   GET /api/reports/export
// @desc    Export report data
// @access  Admin
router.get('/export', async (req, res) => {
  try {
    const { type, startDate, endDate, format = 'json' } = req.query;

    const matchQuery = {};
    if (startDate || endDate) {
      matchQuery.createdAt = {};
      if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
      if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
    }

    let data;
    switch (type) {
      case 'orders':
        data = await Order.find(matchQuery)
          .populate('user', 'firstName lastName email')
          .lean();
        break;
      case 'customers':
        data = await User.find({ ...matchQuery, role: 'user' }).lean();
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid export type'
        });
    }

    if (format === 'csv') {
      // Convert to CSV
      const fields = Object.keys(data[0] || {});
      const csv = [
        fields.join(','),
        ...data.map(row => fields.map(field => JSON.stringify(row[field] || '')).join(','))
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${type}_export.csv`);
      return res.send(csv);
    }

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error exporting data',
      error: error.message
    });
  }
});

module.exports = router;
