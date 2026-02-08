'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import api from '@/services/api';
import { FiArrowLeft, FiCheck, FiX, FiPackage, FiTruck, FiHome, FiLoader } from 'react-icons/fi';

interface OrderItem {
  serviceName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface TrackingStep {
  title: string;
  date: string;
  status: 'completed' | 'current' | 'pending' | 'cancelled';
}

interface OrderDetail {
  _id: string;
  orderId: string;
  items: OrderItem[];
  itemCount: number;
  itemsSummary: string;
  orderDate: string;
  deliveryDate: string;
  discount: number;
  subtotal: number;
  totalPayment: number;
  status: string;
  trackingSteps: TrackingStep[];
}

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

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
const formatStatus = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const OrderTrackingPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/orders/${orderId}`);
      if (res.data.status === 'success') {
        setOrder(res.data.data);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-8 h-8 text-[#0F7BA0] animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (notFound || !order) {
    return (
      <DashboardLayout>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <FiX className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Order Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The order you&apos;re looking for doesn&apos;t exist.</p>
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

  const getStatusColor = (status: string) => {
    if (['confirmed', 'picked_up', 'in_process', 'ready', 'out_for_delivery'].includes(status)) return 'bg-[#0F7BA0] text-white';
    if (status === 'delivered') return 'bg-green-500 text-white';
    if (status === 'cancelled') return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#0F2744] dark:text-white hover:text-[#0F7BA0] transition-colors font-medium"
        >
          <FiArrowLeft /> Back to Orders
        </button>

        {/* Order Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0F2744] dark:text-white">Order Tracking</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Order ID: <span className="font-semibold text-[#0F2744] dark:text-white">{order.orderId}</span></p>
              </div>
              <span className={`inline-flex px-4 py-1.5 rounded-lg text-sm font-semibold capitalize w-fit ${getStatusColor(order.status)}`}>
                {formatStatus(order.status)}
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-base sm:text-lg font-bold text-[#0F2744] dark:text-white mb-4">
              {order.itemCount} items have been ordered : {order.itemsSummary}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Order Date</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F2744] dark:text-white">{formatDate(order.orderDate)}</p>
              </div>
              <div className="text-right lg:text-left">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Approximate Delivery Date</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F2744] dark:text-white">{formatDate(order.deliveryDate)}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Discount</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F2744] dark:text-white">$ {order.discount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Payment</p>
                <p className="text-sm sm:text-base font-semibold text-[#0F2744] dark:text-white">$ {order.totalPayment.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-bold text-[#0F2744] dark:text-white mb-6">Tracking Status</h3>
            
            {/* Desktop Timeline - Horizontal */}
            <div className="hidden md:block">
              <div className="relative flex justify-between items-start">
                {order.trackingSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative z-10" style={{ width: '20%' }}>
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
                    key={index} 
                    className="flex items-start gap-4 pb-8 last:pb-0 relative animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Icon */}
                    <div className="relative z-10 shrink-0">
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-[#0F2744] dark:text-white">Order Items</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {order.items.map((item, index) => (
              <div key={index} className="p-4 sm:p-6 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-[#0F2744] dark:text-white">{item.serviceName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
                <p className="font-semibold text-[#0F2744] dark:text-white">$ {item.subtotal.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Subtotal</span>
            <span className="font-bold text-[#0F2744] dark:text-white">
              $ {order.subtotal.toFixed(2)}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="px-4 sm:px-6 pb-4 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
              <span className="font-semibold text-gray-600 dark:text-gray-300">Discount</span>
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
