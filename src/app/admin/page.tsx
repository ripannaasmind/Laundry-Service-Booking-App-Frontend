'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiShoppingBag, 
  FiUsers, 
  FiDollarSign, 
  FiTruck, 
  FiTrendingUp, 
  FiTrendingDown,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiMoreVertical,
  FiEye
} from 'react-icons/fi';
import Link from 'next/link';

// Stats Card Component
const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color 
}: {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
        <div className={`flex items-center gap-1 mt-2 text-sm ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {changeType === 'up' ? <FiTrendingUp className="w-4 h-4" /> : <FiTrendingDown className="w-4 h-4" />}
          <span>{change} from last month</span>
        </div>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

// Order Status Badge
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

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock data - in real app, fetch from API
  const stats = [
    { title: 'Total Orders', value: '2,845', change: '+12.5%', changeType: 'up' as const, icon: FiShoppingBag, color: 'bg-blue-500' },
    { title: "Today's Orders", value: '156', change: '+8.2%', changeType: 'up' as const, icon: FiPackage, color: 'bg-purple-500' },
    { title: 'Total Revenue', value: '$48,250', change: '+15.3%', changeType: 'up' as const, icon: FiDollarSign, color: 'bg-green-500' },
    { title: 'Total Customers', value: '1,234', change: '+5.7%', changeType: 'up' as const, icon: FiUsers, color: 'bg-orange-500' },
  ];

  const orderStats = [
    { label: 'Pending', count: 45, icon: FiClock, color: 'text-yellow-500' },
    { label: 'Completed', count: 2456, icon: FiCheckCircle, color: 'text-green-500' },
    { label: 'Cancelled', count: 89, icon: FiXCircle, color: 'text-red-500' },
    { label: 'In Delivery', count: 23, icon: FiTruck, color: 'text-blue-500' },
  ];

  const recentOrders = [
    { id: '#LH123456', customer: 'John Doe', service: 'Wash & Fold', amount: '$45.00', status: 'pending', date: '2 min ago' },
    { id: '#LH123455', customer: 'Jane Smith', service: 'Dry Cleaning', amount: '$78.50', status: 'in_process', date: '15 min ago' },
    { id: '#LH123454', customer: 'Mike Johnson', service: 'Ironing', amount: '$25.00', status: 'delivered', date: '1 hour ago' },
    { id: '#LH123453', customer: 'Sarah Williams', service: 'Wash & Iron', amount: '$56.00', status: 'out_for_delivery', date: '2 hours ago' },
    { id: '#LH123452', customer: 'Chris Brown', service: 'Wash & Fold', amount: '$32.00', status: 'cancelled', date: '3 hours ago' },
  ];

  const recentBookings = [
    { id: 1, customer: 'Emily Davis', service: 'Premium Wash', pickup: 'Today, 2:00 PM', status: 'confirmed' },
    { id: 2, customer: 'Robert Wilson', service: 'Dry Cleaning', pickup: 'Today, 4:30 PM', status: 'pending' },
    { id: 3, customer: 'Lisa Anderson', service: 'Wash & Fold', pickup: 'Tomorrow, 10:00 AM', status: 'confirmed' },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Order Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {orderStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-[#0F7BA0] hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="hidden sm:table-cell px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 lg:px-6 py-4">
                      <span className="font-medium text-gray-900 dark:text-white">{order.id}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 lg:hidden">{order.service}</p>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="text-gray-700 dark:text-gray-300">{order.customer}</span>
                    </td>
                    <td className="hidden sm:table-cell px-4 lg:px-6 py-4">
                      <span className="text-gray-600 dark:text-gray-400">{order.service}</span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="font-medium text-gray-900 dark:text-white">{order.amount}</span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Link 
                        href={`/admin/orders/${order.id.replace('#', '')}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors inline-flex"
                      >
                        <FiEye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Bookings</h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FiMoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="p-4 lg:p-6 space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#0F7BA0]/10 flex items-center justify-center shrink-0">
                  <FiPackage className="w-5 h-5 text-[#0F7BA0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{booking.customer}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{booking.service}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Pickup: {booking.pickup}</p>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Chart Section */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Simple Chart Placeholder */}
        <div className="h-64 flex items-end justify-around gap-2 px-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
            const heights = [60, 80, 45, 90, 75, 95];
            return (
              <div key={month} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full max-w-12 bg-linear-to-t from-[#0F7BA0] to-[#0F7BA0]/60 rounded-t-lg transition-all duration-300 hover:from-[#0F2744] hover:to-[#0F2744]/60"
                  style={{ height: `${heights[index]}%` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">{month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
