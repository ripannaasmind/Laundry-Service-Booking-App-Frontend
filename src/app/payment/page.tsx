'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { FiCreditCard, FiCheck } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Dynamically import StripeCheckout to avoid SSR issues
const StripeCheckout = dynamic(
  () => import('@/components/payment/StripeCheckout'),
  { ssr: false }
);

interface CheckoutData {
  orderData: {
    subtotal: number;
    deliveryCost: number;
    discount: number;
    total: number;
  };
  billingInfo: {
    fullName: string;
    email: string;
  };
}

const PaymentPage = () => {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'stripe'>('cod');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [paymentError, setPaymentError] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('checkoutData');
    if (saved) {
      setCheckoutData(JSON.parse(saved));
    }
  }, []);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    const newErrors: { [key: string]: string } = {};

    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Valid card number is required';
      }
      if (!cardDetails.expiryDate || cardDetails.expiryDate.length < 5) {
        newErrors.expiryDate = 'Valid expiry date is required';
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        newErrors.cvv = 'Valid CVV is required';
      }
      if (!cardDetails.cardHolderName) {
        newErrors.cardHolderName = 'Card holder name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card' && !validateCard()) {
      return;
    }

    // For Stripe, the payment is handled by StripeCheckout component
    if (paymentMethod === 'stripe') {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    handlePaymentSuccess();
  };

  const handlePaymentSuccess = () => {
    setShowSuccess(true);

    // Clear cart data
    localStorage.removeItem('cartItems');
    localStorage.removeItem('serviceType');
    localStorage.removeItem('orderData');
    localStorage.removeItem('checkoutData');

    // Redirect after showing success
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setTimeout(() => setPaymentError(''), 5000);
  };

  const subtotal = checkoutData?.orderData?.subtotal || 0;
  const discount = checkoutData?.orderData?.discount || 0;
  const deliveryFee = checkoutData?.orderData?.deliveryCost || 0;
  const total = checkoutData?.orderData?.total || 0;

  // If no checkout data or total is 0, show message
  if (!checkoutData || total === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-20 sm:pt-24 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center max-w-md w-full shadow-xl">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2744] mb-3">
              No Items in Cart
            </h2>
            <p className="text-sm sm:text-base text-[#5a6a7a] mb-6">
              Your cart is empty. Please add items to your cart before proceeding to payment.
            </p>
            <button
              onClick={() => router.push('/services')}
              className="w-full bg-[#0F7BA0] text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-[#0d6a8a]"
            >
              Browse Services
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Success Modal
  if (showSuccess) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 pt-20 sm:pt-24 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center max-w-md w-full shadow-xl animate-scale-in">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <FiCheck className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2744] mb-3">
              Payment Successful!
            </h2>
            <p className="text-sm sm:text-base text-[#5a6a7a] mb-6">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
            <p className="text-xs text-[#5a6a7a]">Redirecting to home page...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20 sm:pt-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Order Summary */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm animate-fade-in-up">
                <h2 className="text-base sm:text-lg font-bold text-[#0f2744] mb-4 sm:mb-6">Order Summary</h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5a6a7a]">Sub Total</span>
                    <span className="text-[#0f2744] font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5a6a7a]">Discount</span>
                    <span className="text-green-600 font-medium">
                      {discount > 0 ? `-$${discount.toFixed(2)}` : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5a6a7a]">Delivery Fee</span>
                    <span className="text-[#0f2744] font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 sm:pt-4">
                    <div className="flex justify-between">
                      <span className="text-base font-bold text-[#0f2744]">Total Payable</span>
                      <span className="text-lg sm:text-xl font-bold text-[#0F7BA0]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm animate-fade-in-up">
                <h2 className="text-base sm:text-lg font-bold text-[#0f2744] mb-4 sm:mb-6">Payment Method</h2>

                {/* Payment Options */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#0F7BA0] bg-[#0F7BA0]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F7BA0] focus:ring-[#0F7BA0]"
                    />
                    <span className="text-sm sm:text-base font-medium text-[#0f2744]">
                      Cash on Delivery
                    </span>
                  </label>

                  {/* Stripe Payment (Recommended) */}
                  <label
                    className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'stripe'
                        ? 'border-[#0F7BA0] bg-[#0F7BA0]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'stripe'}
                      onChange={() => setPaymentMethod('stripe')}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F7BA0] focus:ring-[#0F7BA0]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-medium text-[#0f2744]">
                          Pay with Stripe
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Secure payment with credit/debit card</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-12 h-auto" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#635bff" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"/>
                      </svg>
                    </div>
                  </label>

                  {/* Card Payment */}
                  <label
                    className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#0F7BA0] bg-[#0F7BA0]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#0F7BA0] focus:ring-[#0F7BA0]"
                    />
                    <span className="text-sm sm:text-base font-medium text-[#0f2744]">
                      Credit/Debit Card (Manual)
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      <Image src="/Images/Home/service/img-1.png" alt="Visa" width={32} height={20} className="h-5 w-auto opacity-60" />
                      <Image src="/Images/Home/service/img-2.png" alt="Mastercard" width={32} height={20} className="h-5 w-auto opacity-60" />
                    </div>
                  </label>
                </div>

                {/* Card Details Form */}
                {paymentMethod === 'card' && (
                  <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 animate-fade-in">
                    <div className="space-y-1.5">
                      <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">
                        Card Number
                      </label>
                      <div className="relative">
                        <FiCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: formatCardNumber(e.target.value) })}
                          maxLength={19}
                          className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                            errors.cardNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                          }`}
                        />
                      </div>
                      {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: formatExpiryDate(e.target.value) })}
                          maxLength={5}
                          className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                            errors.expiryDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                          }`}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-xs">{errors.expiryDate}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">
                          CVV
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                          maxLength={4}
                          className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                            errors.cvv ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                          }`}
                        />
                        {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.cardHolderName}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardHolderName: e.target.value })}
                        className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.cardHolderName ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-[#0F7BA0]/20'
                        }`}
                      />
                      {errors.cardHolderName && <p className="text-red-500 text-xs">{errors.cardHolderName}</p>}
                    </div>
                  </div>
                )}

                {/* Stripe Checkout Form */}
                {paymentMethod === 'stripe' && (
                  <div className="mt-4 sm:mt-6 animate-fade-in">
                    {paymentError && (
                      <div className="mb-4 text-red-500 text-sm p-3 bg-red-50 rounded-lg">
                        {paymentError}
                      </div>
                    )}
                    <StripeCheckout
                      amount={total}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      metadata={{
                        customerName: checkoutData?.billingInfo?.fullName || '',
                        customerEmail: checkoutData?.billingInfo?.email || '',
                        orderId: `ORDER-${Date.now()}`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Pay Button - Only show for COD and Card */}
              {(paymentMethod === 'cod' || paymentMethod === 'card') && (
                <>
                  <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="w-full bg-[#0F7BA0] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#0d6a8a] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 animate-fade-in-up"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      'Pay Now'
                    )}
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-400">Or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {/* Pay with Stripe */}
                  <button
                    onClick={() => setPaymentMethod('stripe')}
                    className="w-full border-2 border-[#0F7BA0] text-[#0F7BA0] py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#0F7BA0]/5"
                  >
                    Pay securely with Stripe
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentPage;
