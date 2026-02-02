'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiArrowLeft, FiCheck, FiX, FiPackage, FiTruck, FiHome } from 'react-icons/fi';

// Order data types
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface TrackingStep {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'pending' | 'cancelled';
}

interface OrderDetail {
  id: string;
  orderId: string;
  items: OrderItem[];
  orderDate: string;
  deliveryDate: string;
  discount: number;
  totalPayment: number;
  status: 'ongoing' | 'completed' | 'cancelled';
  trackingSteps: TrackingStep[];
}

// Sample order details data
const ordersDetailData: Record<string, OrderDetail> = {
  '1': {
    id: '1',
    orderId: '#LHONVFD86',
    items: [
      { name: 'Wash & Fold', quantity: 2, price: 10 },
      { name: 'Wash & Press', quantity: 8, price: 5 },
      { name: 'Dry Cleaning', quantity: 2, price: 15 },
    ],
    orderDate: '12 Dec 2025',
    deliveryDate: '18 Dec 2025',
    discount: 0,
    totalPayment: 80.00,
    status: 'ongoing',
    trackingSteps: [
      { id: 1, title: 'Order Confirm', date: '12 Dec 2025', status: 'completed' },
      { id: 2, title: 'Picked Up', date: '13 Dec 2025', status: 'completed' },
      { id: 3, title: 'In Process', date: '15 Dec 2025', status: 'current' },
      { id: 4, title: 'Shipped', date: 'Pending', status: 'pending' },
      { id: 5, title: 'Delivered', date: 'Pending', status: 'pending' },
    ],
  },
  '2': {
    id: '2',
    orderId: '#LHONVFD87',
    items: [
      { name: 'Wash & Fold', quantity: 13, price: 8 },
      { name: 'Dry Cleaning', quantity: 5, price: 12 },
    ],
    orderDate: '12 Oct 2025',
    deliveryDate: '18 Oct 2025',
    discount: 0,
    totalPayment: 100.00,
    status: 'ongoing',
    trackingSteps: [
      { id: 1, title: 'Order Confirm', date: '12 Oct 2025', status: 'completed' },
      { id: 2, title: 'Picked Up', date: '13 Oct 2025', status: 'completed' },
      { id: 3, title: 'In Process', date: '14 Oct 2025', status: 'completed' },
      { id: 4, title: 'Shipped', date: '16 Oct 2025', status: 'current' },
      { id: 5, title: 'Delivered', date: 'Pending', status: 'pending' },
    ],
  },
  '3': {
    id: '3',
    orderId: '#LHONVFD88',
    items: [
      { name: 'Press', quantity: 3, price: 8 },
      { name: 'Dry Cleaning', quantity: 2, price: 28 },
    ],
    orderDate: '1 Dec 2025',
    deliveryDate: '29 Dec 2025',
    discount: 0,
    totalPayment: 80.00,
    status: 'ongoing',
    trackingSteps: [
      { id: 1, title: 'Order Confirm', date: '1 Dec 2025', status: 'completed' },
      { id: 2, title: 'Picked Up', date: 'Pending', status: 'pending' },
      { id: 3, title: 'In Process', date: 'Pending', status: 'pending' },
      { id: 4, title: 'Shipped', date: 'Pending', status: 'pending' },
      { id: 5, title: 'Delivered', date: 'Pending', status: 'pending' },
    ],
  },
  '4': {
    id: '4',
    orderId: '#LHONVFD89',
    items: [
      { name: 'Wash & Fold', quantity: 1, price: 10 },
      { name: 'Press', quantity: 2, price: 15 },
      { name: 'Dry Cleaning', quantity: 2, price: 20 },
    ],
    orderDate: '15 Dec 2025',
    deliveryDate: '20 Dec 2025',
    discount: 0,
    totalPayment: 80.00,
    status: 'completed',
    trackingSteps: [
      { id: 1, title: 'Order Confirm', date: '15 Dec 2025', status: 'completed' },
      { id: 2, title: 'Picked Up', date: '16 Dec 2025', status: 'completed' },
      { id: 3, title: 'In Process', date: '17 Dec 2025', status: 'completed' },
      { id: 4, title: 'Shipped', date: '18 Dec 2025', status: 'completed' },
      { id: 5, title: 'Delivered', date: '20 Dec 2025', status: 'completed' },
    ],
  },
  '5': {
    id: '5',
    orderId: '#LHONVFD90',
    items: [
      { name: 'Wash & Fold', quantity: 5, price: 8 },
      { name: 'Wash & Press', quantity: 5, price: 7 },
    ],
    orderDate: '12 Nov 2025',
    deliveryDate: '18 Nov 2025',
    discount: 5.00,
    totalPayment: 75.00,
    status: 'completed',
    trackingSteps: [
      { id: 1, title: 'Order Confirm', date: '12 Nov 2025', status: 'completed' },
      { id: 2, title: 'Picked Up', date: '13 Nov 2025', status: 'completed' },
      { id: 3, title: 'In Process', date: '14 Nov 2025', status: 'completed' },
      { id: 4, title: 'Shipped', date: '16 Nov 2025', status: 'completed' },
      { id: 5, title: 'Delivered', date: '18 Nov 2025', status: 'completed' },
    ],
  },
  '6': {
    id: '6',
    orderId: '#LHONVFD91',
    items: [
      { name: 'Dry Cleaning', quantity: 8, price: 10 },
    ],
    orderDate: '12 Dec 2025',
    deliveryDate: '18 Dec 2025',
    discount: 0,
    totalPayment: 80.00,
    status: 'cancelled',
    trackingSteps: [
      { id: 1, title: 'Order Confirm', date: '12 Dec 2025', status: 'completed' },
      { id: 2, title: 'Picked Up', date: '13 Dec 2025', status: 'cancelled' },
      { id: 3, title: 'In Process', date: '-', status: 'cancelled' },
      { id: 4, title: 'Shipped', date: '-', status: 'cancelled' },
      { id: 5, title: 'Delivered', date: '-', status: 'cancelled' },
    ],
  },
  '7': {
    id: '7',
    orderId: '#LHONVFD92',
    items: [
      { name: 'Wash & Fold', quantity: 2, price: 15 },
      { name: 'Dry Cleaning', quantity: 3, price: 23 },
    ],
    orderDate: '12 Oct 2025',
    deliveryDate: '18 Oct 2025',
    discount: 0,
    totalPayment: 100.00,
    status: 'cancelled',
    trackingSteps: [
      { id: 1, title: 'Order Confirm', date: '12 Oct 2025', status: 'completed' },
      { id: 2, title: 'Picked Up', date: '13 Oct 2025', status: 'completed' },
      { id: 3, title: 'In Process', date: '14 Oct 2025', status: 'cancelled' },
      { id: 4, title: 'Shipped', date: '-', status: 'cancelled' },
      { id: 5, title: 'Delivered', date: '-', status: 'cancelled' },
    ],
  },
  '8': {
    id: '8',
    orderId: '#LHONVFD93',
    items: [
      { name: 'Press', quantity: 15, price: 5 },
      { name: 'Dry Cleaning', quantity: 5, price: 10 },
    ],
    orderDate: '1 Dec 2025',
    deliveryDate: '29 Dec 2025',
    discount: 5.00,
    totalPayment: 120.00,
    status: 'cancelled',
    trackingSteps: [
      { id: 1, title: 'Order Confirm', date: '1 Dec 2025', status: 'completed' },
      { id: 2, title: 'Picked Up', date: '2 Dec 2025', status: 'completed' },
      { id: 3, title: 'In Process', date: '3 Dec 2025', status: 'completed' },
      { id: 4, title: 'Shipped', date: '5 Dec 2025', status: 'cancelled' },
      { id: 5, title: 'Delivered', date: '-', status: 'cancelled' },
    ],
  },
};

const getStepIcon = (step: TrackingStep, index: number) => {
  if (step.status === 'completed') {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
        <FiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
    );
  }
  if (step.status === 'cancelled') {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
        <FiX className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
    );
  }
  if (step.status === 'current') {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0F7BA0] flex items-center justify-center shadow-lg animate-pulse">
        {index === 2 ? (
          <FiPackage className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : index === 3 ? (
          <FiTruck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <FiHome className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        )}
      </div>
    );
  }
  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center">
      <div className="w-3 h-3 rounded-full bg-gray-400" />
    </div>
  );
};

const getLineColor = (currentStep: TrackingStep, nextStep: TrackingStep | undefined) => {
  if (currentStep.status === 'completed' && nextStep && (nextStep.status === 'completed' || nextStep.status === 'current')) {
    return 'bg-green-500';
  }
  if (currentStep.status === 'cancelled' || (nextStep && nextStep.status === 'cancelled')) {
    return 'bg-red-300';
  }
  return 'bg-gray-200';
};

const OrderTrackingPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const order = ordersDetailData[orderId];

  if (!order) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FiX className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-6">The order you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F2744] text-white rounded-lg font-medium hover:bg-[#1a3a5c] transition-colors"
          >
            <FiArrowLeft /> Back to Orders
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: OrderDetail['status']) => {
    switch (status) {
      case 'ongoing':
        return 'bg-[#0F7BA0] text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);
  const itemsSummary = order.items.map(item => `${item.quantity} ${item.name}`).join(', ');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#0F2744] hover:text-[#0F7BA0] transition-colors font-medium"
        >
          <FiArrowLeft /> Back to Orders
        </button>

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0F2744]">Order Tracking</h1>
                <p className="text-gray-500 mt-1">Order ID: <span className="font-semibold text-[#0F2744]">{order.orderId}</span></p>
              </div>
              <span className={`inline-flex px-4 py-1.5 rounded-lg text-sm font-semibold capitalize w-fit ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-[#0F2744] mb-4">
              {totalItems} items have been ordered : {itemsSummary}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Order Date</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F2744]">{order.orderDate}</p>
              </div>
              <div className="text-right lg:text-left">
                <p className="text-xs sm:text-sm text-gray-500">Approximate Delivery Date</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F2744]">{order.deliveryDate}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Discount</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F2744]">$ {order.discount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-500">Total Payment</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F2744]">$ {order.totalPayment.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-bold text-[#0F2744] mb-6">Tracking Status</h3>
            
            {/* Desktop Timeline - Horizontal */}
            <div className="hidden md:block">
              <div className="relative flex justify-between items-start">
                {order.trackingSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10" style={{ width: '20%' }}>
                    {/* Icon */}
                    <div className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      {getStepIcon(step, index)}
                    </div>
                    
                    {/* Title */}
                    <p className={`mt-3 text-sm font-semibold text-center ${
                      step.status === 'completed' ? 'text-green-600' :
                      step.status === 'cancelled' ? 'text-red-500' :
                      step.status === 'current' ? 'text-[#0F7BA0]' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    
                    {/* Date */}
                    <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                    
                    {/* Connecting Line */}
                    {index < order.trackingSteps.length - 1 && (
                      <div 
                        className={`absolute top-5 sm:top-6 left-[60%] w-full h-1 ${getLineColor(step, order.trackingSteps[index + 1])}`}
                        style={{ width: 'calc(100% - 20px)' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline - Vertical */}
            <div className="md:hidden">
              <div className="relative">
                {order.trackingSteps.map((step, index) => (
                  <div 
                    key={step.id} 
                    className="flex items-start gap-4 pb-8 last:pb-0 relative animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      {getStepIcon(step, index)}
                      
                      {/* Vertical Line */}
                      {index < order.trackingSteps.length - 1 && (
                        <div 
                          className={`absolute top-12 left-1/2 -translate-x-1/2 w-1 h-8 ${getLineColor(step, order.trackingSteps[index + 1])}`}
                        />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="pt-2">
                      <p className={`text-sm font-semibold ${
                        step.status === 'completed' ? 'text-green-600' :
                        step.status === 'cancelled' ? 'text-red-500' :
                        step.status === 'current' ? 'text-[#0F7BA0]' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#0F2744]">Order Items</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items.map((item, index) => (
              <div key={index} className="p-4 sm:p-6 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-[#0F2744]">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-[#0F2744]">$ {(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-6 bg-gray-50 flex justify-between items-center">
            <span className="font-semibold text-gray-600">Subtotal</span>
            <span className="font-bold text-[#0F2744]">
              $ {order.items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="px-4 sm:px-6 pb-4 bg-gray-50 flex justify-between items-center">
              <span className="font-semibold text-gray-600">Discount</span>
              <span className="font-bold text-green-600">- $ {order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="p-4 sm:p-6 bg-[#0F2744] flex justify-between items-center">
            <span className="font-semibold text-white">Total Payment</span>
            <span className="font-bold text-white text-lg">$ {order.totalPayment.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderTrackingPage;
