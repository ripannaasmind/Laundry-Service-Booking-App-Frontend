'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';
import { User } from '@/types/admin';
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiEye, 
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiUserPlus,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiShoppingBag,
  FiLock,
  FiUnlock
} from 'react-icons/fi';

const AdminUsersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'user', label: 'Customers' },
    { id: 'delivery', label: 'Delivery Staff' },
    { id: 'staff', label: 'Staff' },
    { id: 'blocked', label: 'Blocked' },
  ];

  const users = [
    { 
      id: '1',
      name: 'John Doe', 
      email: 'john@email.com',
      phone: '+1 234 567 890',
      role: 'user',
      orders: 15,
      totalSpent: '$1,250.00',
      wallet: '$50.00',
      joinDate: '2024-06-15',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    { 
      id: '2',
      name: 'Jane Smith', 
      email: 'jane@email.com',
      phone: '+1 234 567 891',
      role: 'user',
      orders: 28,
      totalSpent: '$2,450.00',
      wallet: '$125.00',
      joinDate: '2024-03-20',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
    },
    { 
      id: '3',
      name: 'Mike Johnson', 
      email: 'mike@email.com',
      phone: '+1 234 567 892',
      role: 'delivery',
      orders: 0,
      totalSpent: '$0.00',
      wallet: '$0.00',
      joinDate: '2024-08-10',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    { 
      id: '4',
      name: 'Sarah Williams', 
      email: 'sarah@email.com',
      phone: '+1 234 567 893',
      role: 'user',
      orders: 5,
      totalSpent: '$350.00',
      wallet: '$0.00',
      joinDate: '2024-11-05',
      status: 'blocked',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    { 
      id: '5',
      name: 'Chris Brown', 
      email: 'chris@email.com',
      phone: '+1 234 567 894',
      role: 'staff',
      orders: 0,
      totalSpent: '$0.00',
      wallet: '$0.00',
      joinDate: '2024-09-01',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
  ];

  const filteredUsers = activeTab === 'all' 
    ? users 
    : activeTab === 'blocked'
      ? users.filter(user => user.status === 'blocked')
      : users.filter(user => user.role === activeTab);

  const getRoleBadge = (role: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      user: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
      delivery: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400' },
      staff: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
      admin: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
    };
    const c = config[role] || config.user;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === 'active';
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      }`}>
        {isActive ? 'Active' : 'Blocked'}
      </span>
    );
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage customers and staff</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FiDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors">
            <FiUserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add User</span>
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

        {/* Search */}
        <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FiFilter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="hidden sm:table-cell px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="hidden lg:table-cell px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Orders</th>
                <th className="hidden lg:table-cell px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Spent</th>
                <th className="hidden md:table-cell px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wallet</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-4 lg:px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{user.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="hidden lg:table-cell px-4 lg:px-6 py-4">
                    <span className="text-gray-700 dark:text-gray-300">{user.orders}</span>
                  </td>
                  <td className="hidden lg:table-cell px-4 lg:px-6 py-4">
                    <span className="font-medium text-gray-900 dark:text-white">{user.totalSpent}</span>
                  </td>
                  <td className="hidden md:table-cell px-4 lg:px-6 py-4">
                    <button 
                      onClick={() => {
                        setSelectedUser(user as User);
                        setShowUserModal(true);
                      }}
                      className="text-[#0F7BA0] hover:underline"
                    >
                      {user.wallet}
                    </button>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedUser(user as User);
                          setShowWalletModal(true);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                      >
                        {user.status === 'active' ? (
                          <FiLock className="w-4 h-4 text-red-500" />
                        ) : (
                          <FiUnlock className="w-4 h-4 text-green-500" />
                        )}
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
            Showing 1-5 of 1,234 users
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">2</button>
            <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">3</button>
            <span className="px-2">...</span>
            <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">50</button>
            <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowUserModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Details</h3>
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={selectedUser.image}
                    alt={selectedUser.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{selectedUser.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Joined {selectedUser.joinDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <FiMail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white">{selectedUser.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center">
                    <FiShoppingBag className="w-5 h-5 text-[#0F7BA0] mx-auto mb-1" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.orders}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center">
                    <FiDollarSign className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.totalSpent}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Spent</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center">
                    <FiDollarSign className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.wallet}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Wallet</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FiShoppingBag className="w-4 h-4" />
                  View Orders
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <FiLock className="w-4 h-4" />
                  Block User
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Wallet Adjustment Modal */}
      {showWalletModal && selectedUser && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowWalletModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wallet Adjustment</h3>
                <button 
                  onClick={() => setShowWalletModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                User: <span className="font-medium text-gray-900 dark:text-white">{selectedUser.name}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Current Balance: <span className="font-bold text-green-500">{selectedUser.wallet}</span>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="credit">Credit (Add)</option>
                    <option value="debit">Debit (Subtract)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <input 
                    type="text" 
                    placeholder="Reason for adjustment"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminUsersPage;
