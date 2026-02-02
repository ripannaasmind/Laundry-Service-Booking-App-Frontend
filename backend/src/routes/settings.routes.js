const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings.model');
const { protect, adminOnly } = require('../middleware/auth.middleware');

// @route   GET /api/settings/public
// @desc    Get public settings
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const publicKeys = [
      'app_name', 'app_logo', 'currency', 'currency_symbol',
      'delivery_charge', 'free_delivery_threshold', 'tax_percentage',
      'cod_enabled', 'online_payment_enabled', 'maintenance_mode'
    ];

    const settings = await Settings.find({ key: { $in: publicKeys } });
    
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });

    res.json({
      success: true,
      settings: settingsObj
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching settings',
      error: error.message
    });
  }
});

// @route   GET /api/settings
// @desc    Get all settings (admin)
// @access  Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { category } = req.query;
    
    const query = category ? { category } : {};
    const settings = await Settings.find(query);

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching settings',
      error: error.message
    });
  }
});

// @route   PUT /api/settings
// @desc    Update settings
// @access  Admin
router.put('/', protect, adminOnly, async (req, res) => {
  try {
    const updates = req.body; // { key: value, key2: value2 }

    const bulkOps = Object.entries(updates).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { $set: { value } },
        upsert: true
      }
    }));

    await Settings.bulkWrite(bulkOps);

    res.json({
      success: true,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating settings',
      error: error.message
    });
  }
});

// @route   POST /api/settings/init
// @desc    Initialize default settings
// @access  Admin
router.post('/init', protect, adminOnly, async (req, res) => {
  try {
    const { defaultSettings } = require('../models/Settings.model');

    const bulkOps = Object.entries(defaultSettings).map(([key, data]) => ({
      updateOne: {
        filter: { key },
        update: { $setOnInsert: { key, ...data } },
        upsert: true
      }
    }));

    await Settings.bulkWrite(bulkOps);

    res.json({
      success: true,
      message: 'Default settings initialized'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initializing settings',
      error: error.message
    });
  }
});

module.exports = router;
