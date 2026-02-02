'use client';

import { useState } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiCamera, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  altPhone: string;
  addressLine1: string;
  addressLine2: string;
  profileImage: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Ahmmed Imtiaj',
    lastName: 'Shahriar',
    email: 'shahriar@gmail.com',
    gender: 'Male',
    phone: '+001647857657',
    altPhone: '+00545587887',
    addressLine1: 'Shahi mansion, Professor para',
    addressLine2: 'Mirjapur, Suihari, Mirzapur, Dinajpur, Rangpur',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      setProfile(prev => ({ ...prev, profileImage: selectedImage }));
      setShowImageModal(false);
      setSelectedImage(null);
    }
  };

  const handleUpdate = () => {
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-semibold text-[#0F2744] dark:text-white border-b-2 border-[#0F7BA0] pb-2 inline-block">
            My Personal Info
          </h1>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {message && (
            <div className="mb-6 p-3 rounded-lg text-sm bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              {message}
            </div>
          )}

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#0F7BA0] dark:border-[#0F7BA0]">
                <Image
                  src={profile.profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#0F7BA0] hover:bg-[#0d6a8a] text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <FiCamera className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full ps-12 pe-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full ps-12 pe-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <FiMail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full ps-12 pe-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Gender</label>
              <input
                type="text"
                value={profile.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full ps-12 pe-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Alternative Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Alternative Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={profile.altPhone}
                  onChange={(e) => handleChange('altPhone', e.target.value)}
                  className="w-full ps-12 pe-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Address Line 01 */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Address Line 01</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <FiMapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={profile.addressLine1}
                  onChange={(e) => handleChange('addressLine1', e.target.value)}
                  className="w-full ps-12 pe-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Address Line 02 */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Address Line 02</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <FiMapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={profile.addressLine2}
                  onChange={(e) => handleChange('addressLine2', e.target.value)}
                  className="w-full ps-12 pe-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdate}
            className="mt-6 px-8 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg font-medium hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
          >
            Update
          </button>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[9998] animate-fade-in"
            onClick={() => setShowImageModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90vw] max-w-md animate-scale-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              {!selectedImage ? (
                <div className="text-center">
                  <label className="cursor-pointer">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="text-center">
                        <FiCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Click to browse</span>
                      </div>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Drag and drop your image or click to browse</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowImageModal(false)}
                      className="flex-1 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      disabled
                      className="flex-1 px-6 py-2.5 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Adjust your Photo and then confirm</p>
                  <div className="w-48 h-48 mx-auto mb-6 border-2 border-dashed border-[#0F7BA0] p-2">
                    <Image
                      src={selectedImage}
                      alt="Preview"
                      width={180}
                      height={180}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setShowImageModal(false);
                      }}
                      className="flex-1 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleImageUpload}
                      className="flex-1 px-6 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg font-medium hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
