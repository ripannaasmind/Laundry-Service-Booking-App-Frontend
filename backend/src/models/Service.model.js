const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required']
  },
  shortDescription: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['wash-fold', 'wash-iron', 'dry-cleaning', 'ironing', 'special-care', 'alterations']
  },
  priceType: {
    type: String,
    enum: ['per_item', 'per_kg'],
    default: 'per_item'
  },
  pricePerKg: {
    type: Number,
    default: 0
  },
  items: [{
    name: String,
    price: Number,
    image: String
  }],
  images: [{
    type: String
  }],
  icon: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  processingTime: {
    min: { type: Number, default: 24 }, // hours
    max: { type: Number, default: 48 }
  },
  features: [{
    type: String
  }],
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
