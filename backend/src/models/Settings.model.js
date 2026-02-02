const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  category: {
    type: String,
    enum: ['general', 'payment', 'delivery', 'notification', 'tax', 'email', 'sms'],
    default: 'general'
  },
  description: String
}, {
  timestamps: true
});

// Default settings
const defaultSettings = {
  // General
  'app_name': { value: 'LaundryHub', category: 'general', description: 'Application name' },
  'app_logo': { value: '/images/logo/logo.png', category: 'general', description: 'Application logo' },
  'currency': { value: 'USD', category: 'general', description: 'Default currency' },
  'currency_symbol': { value: '$', category: 'general', description: 'Currency symbol' },
  'timezone': { value: 'America/New_York', category: 'general', description: 'Default timezone' },
  'maintenance_mode': { value: false, category: 'general', description: 'Maintenance mode status' },
  
  // Delivery
  'delivery_charge_type': { value: 'fixed', category: 'delivery', description: 'fixed or distance-based' },
  'delivery_charge': { value: 5, category: 'delivery', description: 'Fixed delivery charge' },
  'free_delivery_threshold': { value: 50, category: 'delivery', description: 'Free delivery above this amount' },
  'delivery_radius': { value: 10, category: 'delivery', description: 'Delivery radius in km' },
  
  // Payment
  'cod_enabled': { value: true, category: 'payment', description: 'Cash on delivery enabled' },
  'online_payment_enabled': { value: true, category: 'payment', description: 'Online payment enabled' },
  'wallet_enabled': { value: true, category: 'payment', description: 'Wallet payment enabled' },
  
  // Tax
  'tax_enabled': { value: true, category: 'tax', description: 'Tax enabled' },
  'tax_percentage': { value: 5, category: 'tax', description: 'Tax percentage' },
  'tax_name': { value: 'VAT', category: 'tax', description: 'Tax name' },
  
  // Order Status Labels
  'order_status_labels': { 
    value: {
      pending: 'Order Placed',
      confirmed: 'Confirmed',
      picked_up: 'Picked Up',
      in_process: 'In Process',
      ready: 'Ready',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    }, 
    category: 'general', 
    description: 'Order status labels' 
  }
};

module.exports = mongoose.model('Settings', settingsSchema);
module.exports.defaultSettings = defaultSettings;
