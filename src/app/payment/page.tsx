'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { FiCreditCard, FiCheck } from 'react-icons/fi';

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
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
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

  const subtotal = checkoutData?.orderData?.subtotal || 0;
  const discount = checkoutData?.orderData?.discount || 0;
  const deliveryFee = checkoutData?.orderData?.deliveryCost || 0;
  const total = checkoutData?.orderData?.total || 0;

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
                      Credit/Debit Card
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
              </div>

              {/* Pay Button */}
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

              {/* Pay with Another Card */}
              <button
                onClick={() => setPaymentMethod('card')}
                className="w-full border-2 border-[#0F7BA0] text-[#0F7BA0] py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#0F7BA0]/5"
              >
                Pay with another card
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentPage;
