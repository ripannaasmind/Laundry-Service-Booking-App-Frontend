'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';
import { 
  FiPlus,
  FiMoreVertical,
  FiX,
  FiTruck,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';

const AdminDeliveryPage = () => {
  const [activeTab, setActiveTab] = useState('staff');
  const [showAssignModal, setShowAssignModal] = useState(false);

  const deliveryStaff = [
    { 
      id: '1',
      name: 'David Miller', 
      phone: '+1 234 567 895',
      email: 'david@email.com',
      status: 'active',
      activeOrders: 3,
      completedToday: 8,
      totalDeliveries: 245,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    { 
      id: '2',
      name: 'James Wilson', 
      phone: '+1 234 567 896',
      email: 'james@email.com',
      status: 'active',
      activeOrders: 2,
      completedToday: 5,
      totalDeliveries: 189,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    { 
      id: '3',
      name: 'Robert Taylor', 
      phone: '+1 234 567 897',
      email: 'robert@email.com',
      status: 'offline',
      activeOrders: 0,
      completedToday: 0,
      totalDeliveries: 156,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
  ];

  const pendingDeliveries = [
    {
      id: '#LH123456',
      customer: 'John Doe',
      address: '123 Main St, Apt 4B, New York, NY 10001',
      phone: '+1 234 567 890',
      items: 5,
      amount: '$78.50',
      scheduledTime: 'Today, 2:00 PM - 4:00 PM',
      status: 'ready',
      assignedTo: null
    },
    {
      id: '#LH123455',
      customer: 'Jane Smith',
      address: '456 Oak Ave, Suite 12, Brooklyn, NY 11201',
      phone: '+1 234 567 891',
      items: 8,
      amount: '$125.00',
      scheduledTime: 'Today, 4:00 PM - 6:00 PM',
      status: 'out_for_delivery',
      assignedTo: 'David Miller'
    },
    {
      id: '#LH123454',
      customer: 'Mike Johnson',
      address: '789 Pine Rd, Queens, NY 11375',
      phone: '+1 234 567 892',
      items: 2,
      amount: '$25.00',
      scheduledTime: 'Tomorrow, 10:00 AM - 12:00 PM',
      status: 'ready',
      assignedTo: null
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Delivery Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage delivery staff and assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors">
          <FiPlus className="w-4 h-4" />
          <span>Add Delivery Staff</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('staff')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'staff'
              ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Delivery Staff
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'pending'
              ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Pending Deliveries
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'history'
              ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Delivery History
        </button>
      </div>

      {/* Delivery Staff Tab */}
      {activeTab === 'staff' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveryStaff.map((staff) => (
            <div 
              key={staff.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                      staff.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{staff.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{staff.phone}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <FiMoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                  <FiTruck className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{staff.activeOrders}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                  <FiCheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{staff.completedToday}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Today</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>Total Deliveries: {staff.totalDeliveries}</span>
                <span>⭐ {staff.rating}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                  View Profile
                </button>
                <button 
                  onClick={() => setShowAssignModal(true)}
                  className="flex-1 px-3 py-2 bg-[#0F7BA0] text-white rounded-lg hover:bg-[#0d6a8a] transition-colors text-sm"
                >
                  Assign Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pending Deliveries Tab */}
      {activeTab === 'pending' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="hidden lg:table-cell px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Scheduled</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned</th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {pendingDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 lg:px-6 py-4">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">{delivery.id}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{delivery.items} items • {delivery.amount}</p>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div>
                        <span className="text-gray-900 dark:text-white">{delivery.customer}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{delivery.phone}</p>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 lg:px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{delivery.address}</span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{delivery.scheduledTime}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      {delivery.assignedTo ? (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs">
                          {delivery.assignedTo}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <button
                        onClick={() => setShowAssignModal(true)}
                        className="px-3 py-1.5 bg-[#0F7BA0] text-white rounded-lg text-sm hover:bg-[#0d6a8a] transition-colors"
                      >
                        {delivery.assignedTo ? 'Reassign' : 'Assign'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delivery History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center">
          <FiTruck className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delivery History</h3>
          <p className="text-gray-500 dark:text-gray-400">View detailed delivery history and reports.</p>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowAssignModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Delivery</h3>
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {deliveryStaff.filter(s => s.status === 'active').map((staff) => (
                  <button
                    key={staff.id}
                    className="w-full flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900 dark:text-white">{staff.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{staff.activeOrders} active orders</p>
                    </div>
                    <span className="text-sm text-green-500">⭐ {staff.rating}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDeliveryPage;
