'use client';

import { useState, useEffect, useCallback } from 'react';
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
  FiX,
  FiLoader
} from 'react-icons/fi';
import Link from 'next/link';
import api from '@/services/api';

interface Order {
  _id: string;
  orderId: string;
  itemsSummary: string;
  itemCount: number;
  totalPayment: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  deliveryDate: string;
  user?: { _id: string; name: string; email: string; phone?: string };
}

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'in_process', label: 'In Process' },
    { id: 'ready', label: 'Ready' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.append('status', activeTab);
      params.append('page', page.toString());
      params.append('limit', '20');
      const res = await api.get(`/admin/orders?${params.toString()}`);
      if (res.data.status === 'success') {
        setOrders(res.data.data.orders);
        setTotalPages(res.data.data.totalPages);
        setTotal(res.data.data.total);
      }
    } catch {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [activeTab, page]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    try {
      setUpdating(true);
      await api.put(`/admin/orders/${selectedOrder._id}`, { status: newStatus });
      setShowStatusModal(false);
      setSelectedOrder(null);
      setNewStatus('');
      fetchOrders();
    } catch {
      console.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

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

  const filteredOrders = searchQuery
    ? orders.filter(o => o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) || o.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    : orders;

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
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <FiLoader className="w-8 h-8 text-[#0F7BA0] animate-spin" />
          </div>
        ) : (
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
                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{order.orderId}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <span className="text-gray-900 dark:text-white font-medium">{order.user?.name || 'N/A'}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{order.user?.phone || order.user?.email || ''}</p>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-4 lg:px-6 py-4">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{order.itemsSummary}</span>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{order.itemCount} items</p>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white">${order.totalPayment.toFixed(2)}</span>
                  </td>
                  <td className="hidden sm:table-cell px-4 lg:px-6 py-4">
                    <PaymentBadge status={order.paymentStatus} />
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.status);
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
        )}

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {Math.min((page - 1) * 20 + 1, total)}-{Math.min(page * 20, total)} of {total} orders
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg ${
                  page === p
                    ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
                    : 'border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {p}
              </button>
            ))}
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Order: {selectedOrder?.orderId}</p>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setNewStatus(option.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors text-left ${
                      newStatus === option.value
                        ? 'border-[#0F7BA0] bg-[#0F7BA0]/5 dark:bg-[#0F7BA0]/10'
                        : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
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
                  onClick={handleUpdateStatus}
                  disabled={updating}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updating && <FiLoader className="w-4 h-4 animate-spin" />}
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
