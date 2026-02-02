const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  serviceName: String,
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  weight: Number, // for per_kg pricing
  subtotal: Number
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalItems: {
    type: Number,
    default: 0
  },
  subtotal: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  couponCode: {
    type: String
  },
  deliveryCharge: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'picked_up', 'in_process', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  statusHistory: [{
    status: String,
    date: { type: Date, default: Date.now },
    note: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  pickupAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  deliveryAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  pickupDate: {
    type: Date,
    required: true
  },
  pickupTimeSlot: {
    type: String
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  deliveryTimeSlot: {
    type: String
  },
  actualPickupDate: Date,
  actualDeliveryDate: Date,
  deliveryPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card', 'wallet', 'online'],
    default: 'cod'
  },
  paymentDetails: {
    transactionId: String,
    paidAt: Date,
    method: String
  },
  notes: {
    customer: String,
    internal: String
  },
  rating: {
    score: { type: Number, min: 1, max: 5 },
    review: String,
    date: Date
  },
  cancellationReason: String,
  refundAmount: Number,
  refundStatus: {
    type: String,
    enum: ['none', 'pending', 'processed'],
    default: 'none'
  }
}, {
  timestamps: true
});

// Generate unique order ID before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderId = `#LH${randomStr}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
