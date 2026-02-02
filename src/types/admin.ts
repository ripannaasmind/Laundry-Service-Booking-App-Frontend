// Admin Types - All types used in admin dashboard

// Service Types
export interface ServiceItem {
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  priceType: 'per_kg' | 'per_item';
  pricePerKg: number;
  items: ServiceItem[];
  image: string;
  isActive: boolean;
  sortOrder: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'staff' | 'delivery';
  orders: number;
  totalSpent: string;
  wallet: string;
  joinDate: string;
  status: 'active' | 'blocked';
  image: string;
}

// Review Types
export interface ReviewUser {
  name: string;
  email: string;
  image: string;
}

export interface Review {
  id: string;
  user: ReviewUser;
  orderId: string;
  service: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  response: string | null;
}

// Payment Types
export interface PaymentUser {
  name: string;
  email: string;
  image: string;
}

export interface Payment {
  id: string;
  orderId: string;
  user: PaymentUser;
  amount: string;
  method: 'Credit Card' | 'PayPal' | 'Wallet' | 'Cash';
  cardLast4: string | null;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  transactionId: string;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  maxDiscount: number | null;
  usageLimit: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

// Order Types
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    image: string;
  };
  service: string;
  items: OrderItem[];
  totalAmount: string;
  status: 'pending' | 'confirmed' | 'picked_up' | 'in_process' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  paymentMethod: string;
  pickupDate: string;
  deliveryDate: string;
  address: string;
  notes: string;
  createdAt: string;
}

// Delivery Staff Types
export interface DeliveryStaff {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'offline';
  activeOrders: number;
  completedToday: number;
  totalDeliveries: number;
  rating: number;
  image: string;
}

// Settings Types
export interface Settings {
  // General
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  
  // Business
  currency: string;
  currencySymbol: string;
  timezone: string;
  workingHoursStart: string;
  workingHoursEnd: string;
  minOrderAmount: number;
  taxRate: number;
  
  // Delivery
  freeDeliveryThreshold: number;
  deliveryFee: number;
  deliveryRadius: number;
  expressDeliveryFee: number;
  
  // Payment
  codEnabled: boolean;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  walletEnabled: boolean;
  
  // Notifications
  orderConfirmation: boolean;
  orderStatusUpdates: boolean;
  promotionalEmails: boolean;
  smsNotifications: boolean;
  
  // Security
  twoFactorAuth: boolean;
  maintenanceMode: boolean;
}
