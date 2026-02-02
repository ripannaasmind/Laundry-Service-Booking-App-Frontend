'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiEye, 
  FiEdit2, 
  FiMoreVertical,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from 'react-icons/fi';
import Link from 'next/link';

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
    confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
    picked_up: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400' },
    in_process: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
    ready: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-400' },
    out_for_delivery: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-400' },
    delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
    cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </span>
  );
};

// Payment Badge Component
const PaymentBadge = ({ status }: { status: string }) => {
  const config = status === 'paid' 
    ? { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' }
    : { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const AdminOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'in_process', label: 'In Process' },
    { id: 'ready', label: 'Ready' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const orders = [
    { 
      id: '#LH123456', 
      customer: 'John Doe', 
      email: 'john@email.com',
      phone: '+1 234 567 890',
      items: '3 Wash & Fold, 2 Dry Cleaning',
      itemCount: 5,
      amount: '$78.50',
      status: 'pending',
      payment: 'pending',
      date: '2025-02-01',
      pickupDate: '2025-02-02',
      deliveryDate: '2025-02-05'
    },
    { 
      id: '#LH123455', 
      customer: 'Jane Smith', 
      email: 'jane@email.com',
      phone: '+1 234 567 891',
      items: '5 Wash & Iron, 3 Dry Cleaning',
      itemCount: 8,
      amount: '$125.00',
      status: 'in_process',
      payment: 'paid',
      date: '2025-02-01',
      pickupDate: '2025-02-01',
      deliveryDate: '2025-02-04'
    },
    { 
      id: '#LH123454', 
      customer: 'Mike Johnson', 
      email: 'mike@email.com',
      phone: '+1 234 567 892',
      items: '2 Ironing',
      itemCount: 2,
      amount: '$25.00',
      status: 'delivered',
      payment: 'paid',
      date: '2025-01-30',
      pickupDate: '2025-01-30',
      deliveryDate: '2025-02-01'
    },
    { 
      id: '#LH123453', 
      customer: 'Sarah Williams', 
      email: 'sarah@email.com',
      phone: '+1 234 567 893',
      items: '4 Wash & Fold, 2 Special Care',
      itemCount: 6,
      amount: '$92.00',
      status: 'out_for_delivery',
      payment: 'paid',
      date: '2025-01-31',
      pickupDate: '2025-01-31',
      deliveryDate: '2025-02-02'
    },
    { 
      id: '#LH123452', 
      customer: 'Chris Brown', 
      email: 'chris@email.com',
      phone: '+1 234 567 894',
      items: '3 Wash & Fold',
      itemCount: 3,
      amount: '$45.00',
      status: 'cancelled',
      payment: 'refunded',
      date: '2025-01-29',
      pickupDate: '2025-01-30',
      deliveryDate: '2025-02-01'
    },
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-500' },
    { value: 'picked_up', label: 'Picked Up', color: 'bg-purple-500' },
    { value: 'in_process', label: 'In Process', color: 'bg-orange-500' },
    { value: 'ready', label: 'Ready', color: 'bg-cyan-500' },
    { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-indigo-500' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-500' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' },
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track all orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FiDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        {/* Tabs */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FiCalendar className="w-4 h-4" />
              <span className="hidden sm:inline">Date Range</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="p-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Status</label>
              <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Type</label>
              <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All Services</option>
                <option value="wash-fold">Wash & Fold</option>
                <option value="dry-cleaning">Dry Cleaning</option>
                <option value="ironing">Ironing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Amount</label>
              <input type="number" placeholder="$0" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Amount</label>
              <input type="number" placeholder="$1000" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="hidden lg:table-cell px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="hidden sm:table-cell px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{order.id}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order.date}</p>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <span className="text-gray-900 dark:text-white font-medium">{order.customer}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{order.phone}</p>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-4 lg:px-6 py-4">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{order.items}</span>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{order.itemCount} items</p>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{order.amount}</span>
                  </td>
                  <td className="hidden sm:table-cell px-4 lg:px-6 py-4">
                    <PaymentBadge status={order.payment} />
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/orders/${order.id.replace('#', '')}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedOrder(order.id);
                          setShowStatusModal(true);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="Update Status"
                      >
                        <FiEdit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="More Actions"
                      >
                        <FiMoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing 1-5 of 125 orders
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">2</button>
            <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">3</button>
            <span className="px-2">...</span>
            <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">25</button>
            <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowStatusModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Order Status</h3>
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Order: {selectedOrder}</p>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <div className={`w-3 h-3 rounded-full ${option.color}`} />
                    <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;
