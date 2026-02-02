'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Service } from '@/types/admin';
import { 
  FiSearch, 
  FiPlus,
  FiEdit2, 
  FiTrash2,
  FiMoreVertical,
  FiX,
  FiImage,
  FiDollarSign,
  FiToggleLeft,
  FiToggleRight
} from 'react-icons/fi';

const AdminServicesPage = () => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const services = [
    {
      id: '1',
      name: 'Wash & Fold',
      slug: 'wash-fold',
      category: 'wash-fold',
      description: 'Professional washing and folding service for your everyday clothes.',
      priceType: 'per_kg',
      pricePerKg: 5.00,
      items: [
        { name: 'T-Shirt', price: 2.00 },
        { name: 'Pants', price: 3.00 },
        { name: 'Shirt', price: 2.50 },
      ],
      image: '/Images/Home/service/wash-fold.jpg',
      isActive: true,
      sortOrder: 1
    },
    {
      id: '2',
      name: 'Dry Cleaning',
      slug: 'dry-cleaning',
      category: 'dry-cleaning',
      description: 'Expert dry cleaning for delicate and special garments.',
      priceType: 'per_item',
      pricePerKg: 0,
      items: [
        { name: 'Suit (2pc)', price: 15.00 },
        { name: 'Dress', price: 12.00 },
        { name: 'Coat', price: 18.00 },
      ],
      image: '/Images/Home/service/dry-cleaning.jpg',
      isActive: true,
      sortOrder: 2
    },
    {
      id: '3',
      name: 'Wash & Iron',
      slug: 'wash-iron',
      category: 'wash-iron',
      description: 'Complete wash and press service for crisp, ready-to-wear clothes.',
      priceType: 'per_item',
      pricePerKg: 0,
      items: [
        { name: 'Shirt', price: 3.50 },
        { name: 'Pants', price: 4.00 },
        { name: 'Dress', price: 5.00 },
      ],
      image: '/Images/Home/service/wash-iron.jpg',
      isActive: true,
      sortOrder: 3
    },
    {
      id: '4',
      name: 'Ironing Only',
      slug: 'ironing',
      category: 'ironing',
      description: 'Professional pressing and ironing service.',
      priceType: 'per_item',
      pricePerKg: 0,
      items: [
        { name: 'Shirt', price: 1.50 },
        { name: 'Pants', price: 2.00 },
        { name: 'Dress', price: 2.50 },
      ],
      image: '/Images/Home/service/ironing.jpg',
      isActive: false,
      sortOrder: 4
    },
    {
      id: '5',
      name: 'Special Care',
      slug: 'special-care',
      category: 'special-care',
      description: 'Specialized cleaning for wedding dresses, leather, and delicate items.',
      priceType: 'per_item',
      pricePerKg: 0,
      items: [
        { name: 'Wedding Dress', price: 80.00 },
        { name: 'Leather Jacket', price: 35.00 },
        { name: 'Silk Garment', price: 15.00 },
      ],
      image: '/Images/Home/service/special-care.jpg',
      isActive: true,
      sortOrder: 5
    },
  ];

  const categories = [
    { value: 'wash-fold', label: 'Wash & Fold' },
    { value: 'wash-iron', label: 'Wash & Iron' },
    { value: 'dry-cleaning', label: 'Dry Cleaning' },
    { value: 'ironing', label: 'Ironing' },
    { value: 'special-care', label: 'Special Care' },
    { value: 'alterations', label: 'Alterations' },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Service Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your laundry services and pricing</p>
        </div>
        <button 
          onClick={() => {
            setEditingService(null);
            setShowServiceModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${
              !service.isActive ? 'opacity-60' : ''
            }`}
          >
            {/* Service Image */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <FiImage className="w-12 h-12 text-gray-400" />
              </div>
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  service.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              {/* Sort Order */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{service.sortOrder}</span>
              </div>
            </div>

            {/* Service Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                  <p className="text-xs text-[#0F7BA0]">{categories.find(c => c.value === service.category)?.label}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <FiMoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Pricing */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FiDollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {service.priceType === 'per_kg' ? `$${service.pricePerKg.toFixed(2)} per kg` : 'Per Item Pricing'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-white dark:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-300">
                      {item.name}: ${item.price.toFixed(2)}
                    </span>
                  ))}
                  {service.items.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-[#0F7BA0]/10 text-[#0F7BA0] rounded-lg">
                      +{service.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingService(service as Service);
                    setShowServiceModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    service.isActive
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {service.isActive ? (
                    <>
                      <FiToggleRight className="w-4 h-4" />
                      Disable
                    </>
                  ) : (
                    <>
                      <FiToggleLeft className="w-4 h-4" />
                      Enable
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      {showServiceModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowServiceModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button 
                  onClick={() => setShowServiceModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Name *</label>
                    <input 
                      type="text" 
                      defaultValue={editingService?.name || ''}
                      placeholder="e.g., Wash & Fold"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                    <select 
                      defaultValue={editingService?.category || ''}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                  <textarea 
                    rows={3}
                    defaultValue={editingService?.description || ''}
                    placeholder="Service description..."
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" 
                  />
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pricing Type *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="priceType" value="per_item" defaultChecked={editingService?.priceType === 'per_item'} />
                      <span className="text-gray-700 dark:text-gray-300">Per Item</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="priceType" value="per_kg" defaultChecked={editingService?.priceType === 'per_kg'} />
                      <span className="text-gray-700 dark:text-gray-300">Per Kg</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price per Kg ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    defaultValue={editingService?.pricePerKg || ''}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                </div>

                {/* Items Pricing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item Prices</label>
                  <div className="space-y-2">
                    {(editingService?.items || [{ name: '', price: 0 }]).map((item: { name: string; price: number }, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <input 
                          type="text" 
                          defaultValue={item.name}
                          placeholder="Item name"
                          className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        />
                        <input 
                          type="number" 
                          step="0.01"
                          defaultValue={item.price}
                          placeholder="Price"
                          className="w-24 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        />
                        <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-sm text-[#0F7BA0] hover:underline">
                      <FiPlus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Image</label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-6 text-center">
                    <FiImage className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
                    <input 
                      type="number" 
                      defaultValue={editingService?.sortOrder || 0}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={editingService?.isActive ?? true}
                        className="w-5 h-5 rounded border-gray-300 text-[#0F7BA0] focus:ring-[#0F7BA0]"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Active</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
                >
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowDeleteConfirm(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4 flex items-center justify-center">
                  <FiTrash2 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Service?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  This action cannot be undone. All pricing and item data will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminServicesPage;
