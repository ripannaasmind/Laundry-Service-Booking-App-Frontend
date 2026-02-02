'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiX } from 'react-icons/fi';

// Order types
type OrderStatus = 'all' | 'completed' | 'ongoing' | 'cancelled';

interface Order {
  id: string;
  orderId: string;
  items: string;
  itemCount: number;
  orderDate: string;
  deliveryDate: string;
  discount: number;
  totalPayment: number;
  status: 'ongoing' | 'completed' | 'cancelled';
}

// Sample orders data
const ordersData: Order[] = [
  {
    id: '1',
    orderId: '#LHONVFD86',
    items: '2 Wash & Fold, 8 Wash & Press, and 2 Dry Cleaning',
    itemCount: 12,
    orderDate: '12 Dec 2025',
    deliveryDate: '18 Dec 2025',
    discount: 0,
    totalPayment: 80.00,
    status: 'ongoing',
  },
  {
    id: '2',
    orderId: '#LHONVFD87',
    items: '13 Wash & Fold and 5 Dry Cleaning',
    itemCount: 18,
    orderDate: '12 Oct 2025',
    deliveryDate: '18 Oct 2025',
    discount: 0,
    totalPayment: 100.00,
    status: 'ongoing',
  },
  {
    id: '3',
    orderId: '#LHONVFD88',
    items: '3 Press, and 2 Dry Cleaning',
    itemCount: 5,
    orderDate: '1 Dec 2025',
    deliveryDate: '29 Dec 2025',
    discount: 0,
    totalPayment: 80.00,
    status: 'ongoing',
  },
  {
    id: '4',
    orderId: '#LHONVFD89',
    items: '1 Wash & Fold, 2 Press, and 2 Dry Cleaning',
    itemCount: 5,
    orderDate: '15 Dec 2025',
    deliveryDate: '20 Dec 2025',
    discount: 0,
    totalPayment: 80.00,
    status: 'completed',
  },
  {
    id: '5',
    orderId: '#LHONVFD90',
    items: '5 Wash & Fold, 5 Wash & Press',
    itemCount: 10,
    orderDate: '12 Nov 2025',
    deliveryDate: '18 Nov 2025',
    discount: 5.00,
    totalPayment: 75.00,
    status: 'completed',
  },
  {
    id: '6',
    orderId: '#LHONVFD91',
    items: '8 Dry Cleaning',
    itemCount: 8,
    orderDate: '12 Dec 2025',
    deliveryDate: '18 Dec 2025',
    discount: 0,
    totalPayment: 80.00,
    status: 'cancelled',
  },
  {
    id: '7',
    orderId: '#LHONVFD92',
    items: '2 Wash & Fold and 3 Dry Cleaning',
    itemCount: 5,
    orderDate: '12 Oct 2025',
    deliveryDate: '18 Oct 2025',
    discount: 0,
    totalPayment: 100.00,
    status: 'cancelled',
  },
  {
    id: '8',
    orderId: '#LHONVFD93',
    items: '15 Press, and 5 Dry Cleaning',
    itemCount: 20,
    orderDate: '1 Dec 2025',
    deliveryDate: '29 Dec 2025',
    discount: 5.00,
    totalPayment: 120.00,
    status: 'cancelled',
  },
];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus>('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [modalTop, setModalTop] = useState(0);
  const orderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const tabs: { id: OrderStatus; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'completed', label: 'Completed' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filteredOrders = activeTab === 'all' 
    ? ordersData 
    : ordersData.filter(order => order.status === activeTab);

  const getStatusColor = (status: Order['status']) => {
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

  const handleCancelOrder = (orderId: string) => {
    const orderElement = orderRefs.current[orderId];
    if (orderElement) {
      const rect = orderElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Position modal at the top of the order card
      setModalTop(rect.top + scrollTop);
    }
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    if (selectedOrderId) {
      // Find the order and update its status
      const orderIndex = ordersData.findIndex(o => o.id === selectedOrderId);
      if (orderIndex !== -1) {
        ordersData[orderIndex].status = 'cancelled';
      }
    }
    setShowCancelModal(false);
    setSelectedOrderId(null);
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F2744]">My Order</h1>
        </div>

        {/* Tabs */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#0F2744] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FiX className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders found</h3>
              <p className="text-gray-500">You don&apos;t have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={order.id}
                ref={(el) => { orderRefs.current[order.id] = el; }}
                className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-[#0F7BA0]/30 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <span className={`inline-flex px-3 py-1 rounded-md text-xs sm:text-sm font-semibold capitalize w-fit ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Order ID: <span className="font-semibold text-[#0F2744]">{order.orderId}</span>
                  </span>
                </div>

                {/* Order Details */}
                <h3 className="text-base sm:text-lg font-bold text-[#0F2744] mb-4">
                  {order.itemCount} items have been ordered : {order.items}
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  {order.status === 'ongoing' && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="flex-1 sm:flex-none px-6 py-2.5 border-2 border-gray-300 text-gray-600 rounded-lg font-medium hover:border-red-500 hover:text-red-500 transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  )}
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0F2744] text-white rounded-lg font-medium hover:bg-[#1a3a5c] transition-colors text-center text-sm sm:text-base"
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
            className="fixed inset-0 z-[9998] animate-fade-in"
            onClick={() => setShowCancelModal(false)}
          />
          <div 
            className="fixed left-1/2 -translate-x-1/2 z-[9999] animate-scale-in"
            style={{ top: `${modalTop}px` }}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-[90vw] sm:w-96 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Do you want to cancel this order?
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-6 py-2.5 border-2 border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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
