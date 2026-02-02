'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';
import { Payment } from '@/types/admin';
import { 
  FiSearch,
  FiDownload,
  FiEye,
  FiX,
  FiDollarSign,
  FiCreditCard,
  FiTrendingUp,
  FiRefreshCw,
  FiAlertCircle
} from 'react-icons/fi';

const AdminPaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const payments = [
    {
      id: 'PAY-001',
      orderId: '#LH123456',
      user: { name: 'John Doe', email: 'john@email.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      amount: '$78.50',
      method: 'Credit Card',
      cardLast4: '4242',
      status: 'completed',
      date: '2025-02-01 10:30 AM',
      transactionId: 'txn_1234567890'
    },
    {
      id: 'PAY-002',
      orderId: '#LH123455',
      user: { name: 'Jane Smith', email: 'jane@email.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
      amount: '$125.00',
      method: 'PayPal',
      cardLast4: null,
      status: 'completed',
      date: '2025-02-01 09:15 AM',
      transactionId: 'PP-9876543210'
    },
    {
      id: 'PAY-003',
      orderId: '#LH123454',
      user: { name: 'Mike Johnson', email: 'mike@email.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
      amount: '$45.00',
      method: 'Credit Card',
      cardLast4: '1234',
      status: 'failed',
      date: '2025-01-31 03:45 PM',
      transactionId: 'txn_failed123'
    },
    {
      id: 'PAY-004',
      orderId: '#LH123453',
      user: { name: 'Sarah Williams', email: 'sarah@email.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      amount: '$25.00',
      method: 'Wallet',
      cardLast4: null,
      status: 'refunded',
      date: '2025-01-30 11:20 AM',
      transactionId: 'WAL-5555666677'
    },
    {
      id: 'PAY-005',
      orderId: '#LH123452',
      user: { name: 'Chris Brown', email: 'chris@email.com', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      amount: '$89.99',
      method: 'Credit Card',
      cardLast4: '5678',
      status: 'pending',
      date: '2025-01-30 02:00 PM',
      transactionId: 'txn_pending456'
    },
  ];

  const filteredPayments = activeTab === 'all' 
    ? payments 
    : payments.filter(p => p.status === activeTab);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'refunded':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Credit Card':
        return <FiCreditCard className="w-4 h-4" />;
      case 'PayPal':
        return <span className="text-xs font-bold text-blue-600">PP</span>;
      case 'Wallet':
        return <FiDollarSign className="w-4 h-4" />;
      default:
        return <FiDollarSign className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage transactions, refunds and payment history</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors">
          <FiDownload className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xs text-green-500">+12.5%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$48,250</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiCreditCard className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-green-500">+8.3%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1,256</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Transactions</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <FiAlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-xs text-red-500">+2.1%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Failed Payments</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <FiRefreshCw className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xs text-purple-500">5</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$450</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Refunded</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['all', 'completed', 'pending', 'failed', 'refunded'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, transaction ID, or customer..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="">All Methods</option>
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="wallet">Wallet</option>
          </select>
          <input
            type="date"
            className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="hidden lg:table-cell px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 lg:px-6 py-4">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{payment.id}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{payment.orderId}</p>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={payment.user.image}
                          alt={payment.user.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{payment.user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{payment.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        {getMethodIcon(payment.method)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{payment.method}</p>
                        {payment.cardLast4 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">****{payment.cardLast4}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{payment.amount}</span>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-4 lg:px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{payment.date}</span>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <FiEye className="w-4 h-4 text-gray-500" />
                      </button>
                      {payment.status === 'completed' && (
                        <button 
                          onClick={() => {
                            setSelectedPayment(payment as Payment);
                            setShowRefundModal(true);
                          }}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Refund"
                        >
                          <FiRefreshCw className="w-4 h-4 text-red-500" />
                        </button>
                      )}
                      {payment.status === 'failed' && (
                        <button 
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 lg:px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing 1 to {filteredPayments.length} of {filteredPayments.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && selectedPayment && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowRefundModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Process Refund</h3>
                <button 
                  onClick={() => setShowRefundModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPayment.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Order ID</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPayment.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Amount</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedPayment.amount}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Refund Amount</label>
                  <input 
                    type="text" 
                    defaultValue={selectedPayment.amount}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter partial amount for partial refund</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason for Refund</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select reason</option>
                    <option value="customer_request">Customer Request</option>
                    <option value="damaged">Items Damaged</option>
                    <option value="lost">Items Lost</option>
                    <option value="service_issue">Service Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Add any additional notes..."
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" 
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ This action cannot be undone. The refund will be processed to the original payment method.
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminPaymentsPage;
