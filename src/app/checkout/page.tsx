'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';

interface OrderItem {
  serviceType: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
}

interface OrderData {
  cartGroups: {
    serviceType: string;
    items: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[];
  }[];
  subtotal: number;
  deliveryCost: number;
  discount: number;
  total: number;
}

const CheckoutPage = () => {
  const router = useRouter();
  
  // Initialize order data from localStorage
  const initializeOrderData = (): OrderData | null => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('orderData');
    return saved ? JSON.parse(saved) : null;
  };
  
  const [orderData] = useState<OrderData | null>(initializeOrderData);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    alternativePhone: '',
    address: '',
    additionalInstruction: '',
  });

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    alternativePhone: '',
    address: '',
    additionalInstruction: '',
  });

  const [schedule, setSchedule] = useState({
    pickupDate: '',
    pickupSlot: '',
    deliveryDate: '',
    deliverySlot: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!billingInfo.fullName) newErrors.billingFullName = 'Full name is required';
    if (!billingInfo.email) newErrors.billingEmail = 'Email is required';
    if (!billingInfo.phone) newErrors.billingPhone = 'Phone number is required';
    if (!billingInfo.address) newErrors.billingAddress = 'Address is required';

    if (!sameAsBilling) {
      if (!shippingInfo.fullName) newErrors.shippingFullName = 'Full name is required';
      if (!shippingInfo.phone) newErrors.shippingPhone = 'Phone number is required';
      if (!shippingInfo.address) newErrors.shippingAddress = 'Address is required';
    }

    if (!schedule.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!schedule.pickupSlot) newErrors.pickupSlot = 'Pickup time slot is required';
    if (!schedule.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
    if (!schedule.deliverySlot) newErrors.deliverySlot = 'Delivery time slot is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      const checkoutData = {
        orderData,
        billingInfo,
        shippingInfo: sameAsBilling ? billingInfo : shippingInfo,
        schedule,
      };
      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
      router.push('/payment');
    }
  };

  const getOrderItems = (): OrderItem[] => {
    if (!orderData) return [];
    
    return orderData.cartGroups.flatMap((group) =>
      group.items.map((item) => ({
        serviceType: group.serviceType,
        itemName: item.name,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      }))
    );
  };

  const orderItems = getOrderItems();

  return (
    <>
      <main className="min-h-screen bg-gray-50 pt-20 sm:pt-24 mb-10">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Order Summary - Left Side */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm sticky top-24 animate-fade-in-up">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h2 className="text-base sm:text-lg font-bold text-[#0f2744]">Order Summary</h2>
                </div>

                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-4 gap-2 px-4 sm:px-6 py-3 bg-[#0f2744] text-white text-xs sm:text-sm font-medium">
                  <span>Service Type</span>
                  <span>Item Name</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total Price</span>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                  {orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 sm:px-6 py-3 text-xs sm:text-sm"
                    >
                      <span className="text-[#5a6a7a] sm:text-[#0f2744]">{item.serviceType}</span>
                      <span className="text-[#0f2744] font-medium">{item.itemName}</span>
                      <span className="text-[#5a6a7a] text-left sm:text-center">{item.quantity}</span>
                      <span className="text-[#0f2744] font-medium text-right">$ {item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="p-4 sm:p-6 border-t border-gray-100 space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-[#5a6a7a]">Subtotal</span>
                    <span className="text-[#0f2744] font-medium">$ {orderData?.subtotal.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-[#5a6a7a]">Discount</span>
                    <span className="text-green-600 font-medium">$ {orderData?.discount.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-[#5a6a7a]">Delivery Fee</span>
                    <span className="text-[#0f2744] font-medium">$ {orderData?.deliveryCost.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base pt-2 border-t border-gray-100">
                    <span className="font-bold text-[#0f2744]">Total</span>
                    <span className="font-bold text-[#0F7BA0]">$ {orderData?.total.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form - Right Side */}
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
              {/* Billing Info */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm animate-fade-in-up">
                <h2 className="text-base sm:text-lg font-bold text-[#0f2744] mb-4 sm:mb-6">Billing Info</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Full Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={billingInfo.fullName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, fullName: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.billingFullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      />
                    </div>
                    {errors.billingFullName && <p className="text-red-500 text-xs">{errors.billingFullName}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.billingEmail ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      />
                    </div>
                    {errors.billingEmail && <p className="text-red-500 text-xs">{errors.billingEmail}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Phone Number</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.billingPhone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      />
                    </div>
                    {errors.billingPhone && <p className="text-red-500 text-xs">{errors.billingPhone}</p>}
                  </div>

                  {/* Alternative Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Alternative Phone Number</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        placeholder="Alternative Phone Number"
                        value={billingInfo.alternativePhone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, alternativePhone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Address</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <textarea
                        placeholder="Type here..."
                        rows={2}
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 resize-none ${
                          errors.billingAddress ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      />
                    </div>
                    {errors.billingAddress && <p className="text-red-500 text-xs">{errors.billingAddress}</p>}
                  </div>

                  {/* Additional Instructions */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Additional Instruction</label>
                    <textarea
                      placeholder="For e.g. Contactless delivery"
                      rows={2}
                      value={billingInfo.additionalInstruction}
                      onChange={(e) => setBillingInfo({ ...billingInfo, additionalInstruction: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-[#0f2744]">Shipping Info</h2>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={(e) => setSameAsBilling(e.target.checked)}
                      className="w-5 h-5 sm:w-5 sm:h-5 text-[#0F2744] rounded-lg focus:ring-[#0F2744] focus:ring-2 mt-1 sm:mt-0 cursor-pointer accent-[#0F2744]"
                    />
                    <span className="text-xs sm:text-sm text-[#5a6a7a]">Same as Billing info</span>
                  </label>
                </div>

                {!sameAsBilling && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Full Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                            errors.shippingFullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                          }`}
                        />
                      </div>
                      {errors.shippingFullName && <p className="text-red-500 text-xs">{errors.shippingFullName}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Phone Number</label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                            errors.shippingPhone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                          }`}
                        />
                      </div>
                      {errors.shippingPhone && <p className="text-red-500 text-xs">{errors.shippingPhone}</p>}
                    </div>

                    {/* Alternative Phone */}
                    <div className="space-y-1.5">
                      <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Alternative Phone Number</label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          placeholder="Alternative Phone Number"
                          value={shippingInfo.alternativePhone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, alternativePhone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Address</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        <textarea
                          placeholder="Type here..."
                          rows={2}
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 resize-none ${
                            errors.shippingAddress ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                          }`}
                        />
                      </div>
                      {errors.shippingAddress && <p className="text-red-500 text-xs">{errors.shippingAddress}</p>}
                    </div>

                    {/* Additional Instructions */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Additional Instruction</label>
                      <textarea
                        placeholder="For e.g. Contactless delivery"
                        rows={2}
                        value={shippingInfo.additionalInstruction}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, additionalInstruction: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Pickup Schedule */}
                  <div className="space-y-4">
                    <h3 className="text-sm sm:text-base font-bold text-[#0f2744]">Pickup Schedule</h3>
                    
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs sm:text-sm text-[#5a6a7a]">
                        <FiCalendar className="w-4 h-4" />
                        No date selected
                      </label>
                      <input
                        type="date"
                        value={schedule.pickupDate}
                        onChange={(e) => setSchedule({ ...schedule, pickupDate: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.pickupDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      />
                      {errors.pickupDate && <p className="text-red-500 text-xs">{errors.pickupDate}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs sm:text-sm text-[#5a6a7a]">
                        <FiClock className="w-4 h-4" />
                        Select pick up slot
                      </label>
                      <select
                        value={schedule.pickupSlot}
                        onChange={(e) => setSchedule({ ...schedule, pickupSlot: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.pickupSlot ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      >
                        <option value="">Select time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      {errors.pickupSlot && <p className="text-red-500 text-xs">{errors.pickupSlot}</p>}
                    </div>
                  </div>

                  {/* Delivery Schedule */}
                  <div className="space-y-4">
                    <h3 className="text-sm sm:text-base font-bold text-[#0f2744]">Delivery Schedule</h3>
                    
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs sm:text-sm text-[#5a6a7a]">
                        <FiCalendar className="w-4 h-4" />
                        No date selected
                      </label>
                      <input
                        type="date"
                        value={schedule.deliveryDate}
                        onChange={(e) => setSchedule({ ...schedule, deliveryDate: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.deliveryDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      />
                      {errors.deliveryDate && <p className="text-red-500 text-xs">{errors.deliveryDate}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs sm:text-sm text-[#5a6a7a]">
                        <FiClock className="w-4 h-4" />
                        Select delivery slot
                      </label>
                      <select
                        value={schedule.deliverySlot}
                        onChange={(e) => setSchedule({ ...schedule, deliverySlot: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.deliverySlot ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      >
                        <option value="">Select delivery slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      {errors.deliverySlot && <p className="text-red-500 text-xs">{errors.deliverySlot}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#162e4b] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#0d223c] hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: '300ms' }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    
    </>
  );
};

export default CheckoutPage;
