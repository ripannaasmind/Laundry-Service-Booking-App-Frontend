'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiSave,
  FiGlobe,
  FiDollarSign,
  FiClock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiImage,
  FiUpload,
  FiPercent,
  FiTruck,
  FiCreditCard,
  FiBell,
  FiShield
} from 'react-icons/fi';

// ToggleSwitch Component - outside of main component
const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-12 h-6 rounded-full transition-colors ${
      enabled ? 'bg-[#0F7BA0]' : 'bg-gray-300 dark:bg-gray-600'
    }`}
  >
    <div
      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
        enabled ? 'left-7' : 'left-1'
      }`}
    />
  </button>
);

const AdminSettingsPage = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    // General
    siteName: 'Laundry Hub',
    tagline: 'Professional Laundry Service',
    email: 'support@laundryhub.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street, New York, NY 10001',
    
    // Business
    currency: 'USD',
    currencySymbol: '$',
    timezone: 'America/New_York',
    workingHoursStart: '08:00',
    workingHoursEnd: '20:00',
    minOrderAmount: 15,
    taxRate: 8.5,
    
    // Delivery
    freeDeliveryThreshold: 50,
    deliveryFee: 5.99,
    deliveryRadius: 15,
    expressDeliveryFee: 9.99,
    
    // Payment
    codEnabled: true,
    stripeEnabled: true,
    paypalEnabled: true,
    walletEnabled: true,
    
    // Notifications
    orderConfirmation: true,
    orderStatusUpdates: true,
    promotionalEmails: true,
    smsNotifications: false,
    
    // Security
    twoFactorAuth: false,
    maintenanceMode: false,
  });

  const sections = [
    { id: 'general', label: 'General', icon: FiGlobe },
    { id: 'business', label: 'Business', icon: FiDollarSign },
    { id: 'delivery', label: 'Delivery', icon: FiTruck },
    { id: 'payment', label: 'Payment', icon: FiCreditCard },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your application settings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors">
          <FiSave className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-2">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-[#0F7BA0]/10 text-[#0F7BA0]'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {/* General Settings */}
          {activeSection === 'general' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">General Settings</h2>
              
              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                      <FiImage className="w-8 h-8 text-gray-400" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <FiUpload className="w-4 h-4" />
                      Upload Logo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name</label>
                    <input 
                      type="text" 
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tagline</label>
                    <input 
                      type="text" 
                      value={settings.tagline}
                      onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <FiMail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiPhone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiMapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    <input 
                      type="text" 
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Settings */}
          {activeSection === 'business' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Business Settings</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
                    <select 
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="BDT">BDT - Bangladeshi Taka</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Symbol</label>
                    <input 
                      type="text" 
                      value={settings.currencySymbol}
                      onChange={(e) => setSettings({...settings, currencySymbol: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                    <select 
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="America/New_York">America/New_York</option>
                      <option value="America/Los_Angeles">America/Los_Angeles</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Asia/Dhaka">Asia/Dhaka</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiClock className="w-4 h-4 inline mr-2" />
                      Working Hours Start
                    </label>
                    <input 
                      type="time" 
                      value={settings.workingHoursStart}
                      onChange={(e) => setSettings({...settings, workingHoursStart: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiClock className="w-4 h-4 inline mr-2" />
                      Working Hours End
                    </label>
                    <input 
                      type="time" 
                      value={settings.workingHoursEnd}
                      onChange={(e) => setSettings({...settings, workingHoursEnd: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiDollarSign className="w-4 h-4 inline mr-2" />
                      Minimum Order Amount
                    </label>
                    <input 
                      type="number" 
                      value={settings.minOrderAmount}
                      onChange={(e) => setSettings({...settings, minOrderAmount: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiPercent className="w-4 h-4 inline mr-2" />
                      Tax Rate (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={settings.taxRate}
                      onChange={(e) => setSettings({...settings, taxRate: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Settings */}
          {activeSection === 'delivery' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Delivery Settings</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Standard Delivery Fee</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        type="number" 
                        step="0.01"
                        value={settings.deliveryFee}
                        onChange={(e) => setSettings({...settings, deliveryFee: Number(e.target.value)})}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Express Delivery Fee</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        type="number" 
                        step="0.01"
                        value={settings.expressDeliveryFee}
                        onChange={(e) => setSettings({...settings, expressDeliveryFee: Number(e.target.value)})}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Free Delivery Threshold</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        type="number" 
                        value={settings.freeDeliveryThreshold}
                        onChange={(e) => setSettings({...settings, freeDeliveryThreshold: Number(e.target.value)})}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Orders above this amount get free delivery</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Radius (km)</label>
                    <input 
                      type="number" 
                      value={settings.deliveryRadius}
                      onChange={(e) => setSettings({...settings, deliveryRadius: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeSection === 'payment' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Payment Methods</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-purple-600">S</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Stripe</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Credit/Debit Cards</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.stripeEnabled}
                    onChange={() => setSettings({...settings, stripeEnabled: !settings.stripeEnabled})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-blue-600">PP</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">PayPal</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">PayPal Payments</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.paypalEnabled}
                    onChange={() => setSettings({...settings, paypalEnabled: !settings.paypalEnabled})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <FiDollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Wallet</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pay with wallet balance</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.walletEnabled}
                    onChange={() => setSettings({...settings, walletEnabled: !settings.walletEnabled})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <FiTruck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Cash on Delivery</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pay when delivered</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.codEnabled}
                    onChange={() => setSettings({...settings, codEnabled: !settings.codEnabled})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeSection === 'notifications' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Order Confirmation</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Send email when order is placed</p>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.orderConfirmation}
                    onChange={() => setSettings({...settings, orderConfirmation: !settings.orderConfirmation})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Order Status Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notify customers when order status changes</p>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.orderStatusUpdates}
                    onChange={() => setSettings({...settings, orderStatusUpdates: !settings.orderStatusUpdates})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Promotional Emails</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Send marketing and promotional content</p>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.promotionalEmails}
                    onChange={() => setSettings({...settings, promotionalEmails: !settings.promotionalEmails})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">SMS Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Send text messages for important updates</p>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.smsNotifications}
                    onChange={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Require 2FA for admin accounts</p>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.twoFactorAuth}
                    onChange={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Maintenance Mode</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">Site will be inaccessible to users</p>
                  </div>
                  <ToggleSwitch 
                    enabled={settings.maintenanceMode}
                    onChange={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                  />
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">API Keys</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stripe Secret Key</label>
                      <input 
                        type="password" 
                        placeholder="sk_live_xxxxxxxxxxxxx"
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stripe Publishable Key</label>
                      <input 
                        type="text" 
                        placeholder="pk_live_xxxxxxxxxxxxx"
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
