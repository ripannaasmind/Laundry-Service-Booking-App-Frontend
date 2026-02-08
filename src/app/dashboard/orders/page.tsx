'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import api from '@/services/api';
import { FiX, FiDownload, FiRefreshCw, FiLoader } from 'react-icons/fi';

// Order types
type OrderFilter = 'all' | 'completed' | 'ongoing' | 'cancelled';

interface Order {
  _id: string;
  orderId: string;
  itemsSummary: string;
  itemCount: number;
  orderDate: string;
  deliveryDate: string;
  discount: number;
  totalPayment: number;
  status: string;
}

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState<OrderFilter>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [modalTop, setModalTop] = useState(0);
  const orderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const tabs: { id: OrderFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'completed', label: 'Completed' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders/my-orders', { params: { status: activeTab } });
      if (res.data.status === 'success') {
        setOrders(res.data.data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusColor = (status: string) => {
    if (['confirmed', 'picked_up', 'in_process', 'ready', 'out_for_delivery'].includes(status))
      return 'bg-[#0F7BA0] text-white';
    if (status === 'delivered') return 'bg-green-500 text-white';
    if (status === 'cancelled') return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

  const formatStatus = (status: string) => status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const isOngoing = (status: string) => !['delivered', 'cancelled'].includes(status);

  const handleCancelOrder = (orderId: string) => {
    const orderElement = orderRefs.current[orderId];
    if (orderElement) {
      const rect = orderElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setModalTop(rect.top + scrollTop);
    }
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async () => {
    if (selectedOrderId) {
      try {
        await api.put(`/orders/${selectedOrderId}/cancel`);
        fetchOrders();
      } catch {
        // silently fail
      }
    }
    setShowCancelModal(false);
    setSelectedOrderId(null);
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-semibold text-[#0F2744] dark:text-white border-b-2 border-[#0F7BA0] pb-2 inline-block">My Orders</h1>
        </div>

        {/* Tabs */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FiLoader className="w-8 h-8 text-[#0F7BA0] animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <FiX className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No orders found</h3>
              <p className="text-gray-500 dark:text-gray-400">You don&apos;t have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id}
                ref={(el) => { orderRefs.current[order._id] = el; }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:border-[#0F7BA0]/30 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <span className={`inline-flex px-3 py-1 rounded-md text-xs sm:text-sm font-semibold capitalize w-fit ${getStatusColor(order.status)}`}>
                    {formatStatus(order.status)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Order ID: <span className="font-semibold text-[#0F2744] dark:text-white">{order.orderId}</span>
                  </span>
                </div>

                {/* Order Details */}
                <h3 className="text-base sm:text-lg font-bold text-[#0F2744] dark:text-white mb-4">
                  {order.itemCount} items have been ordered : {order.itemsSummary}
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {isOngoing(order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="flex-1 sm:flex-none px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:border-red-500 hover:text-red-500 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <>
                      <button
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:border-[#0F7BA0] hover:text-[#0F7BA0] transition-colors text-sm"
                      >
                        <FiDownload className="w-4 h-4" />
                        Invoice
                      </button>
                      <Link
                        href="/services"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-[#0F7BA0] text-[#0F7BA0] rounded-lg font-medium hover:bg-[#0F7BA0] hover:text-white transition-colors text-sm"
                      >
                        <FiRefreshCw className="w-4 h-4" />
                        Re-order
                      </Link>
                    </>
                  )}
                  <Link
                    href={`/dashboard/orders/${order._id}`}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg font-medium hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors text-center text-sm"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <>
          <div 
            className="fixed inset-0 z-9998 animate-fade-in"
            onClick={() => setShowCancelModal(false)}
          />
          <div 
            className="fixed left-1/2 -translate-x-1/2 z-9999 animate-scale-in"
            style={{ top: `${modalTop}px` }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 w-[90vw] sm:w-96 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
                  Do you want to cancel this order?
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    No
                  </button>
                  <button
                    onClick={confirmCancelOrder}
                    className="flex-1 px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default OrdersPage;
