'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';
import { Review } from '@/types/admin';
import { 
  FiSearch,
  FiStar,
  FiCheck,
  FiX,
  FiMessageSquare,
  FiThumbsUp,
  FiEye,
  FiFilter
} from 'react-icons/fi';

const AdminReviewsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);

  const reviews = [
    {
      id: '1',
      user: { name: 'John Doe', email: 'john@email.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      orderId: '#LH123456',
      service: 'Wash & Fold',
      rating: 5,
      title: 'Excellent Service!',
      comment: 'Very professional and fast service. My clothes came back fresh and perfectly folded. Will definitely use again!',
      date: '2025-02-01',
      status: 'pending',
      response: null
    },
    {
      id: '2',
      user: { name: 'Jane Smith', email: 'jane@email.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
      orderId: '#LH123455',
      service: 'Dry Cleaning',
      rating: 4,
      title: 'Good quality',
      comment: 'The dry cleaning was well done. Delivery was a bit delayed but overall satisfied with the result.',
      date: '2025-01-30',
      status: 'approved',
      response: 'Thank you for your feedback! We apologize for the delay and will work on improving our delivery times.'
    },
    {
      id: '3',
      user: { name: 'Mike Johnson', email: 'mike@email.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
      orderId: '#LH123454',
      service: 'Ironing',
      rating: 3,
      title: 'Average experience',
      comment: 'The ironing was okay but I expected better for the price. Some shirts still had wrinkles.',
      date: '2025-01-28',
      status: 'pending',
      response: null
    },
    {
      id: '4',
      user: { name: 'Sarah Williams', email: 'sarah@email.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      orderId: '#LH123453',
      service: 'Special Care',
      rating: 5,
      title: 'Amazing attention to detail',
      comment: 'They handled my silk dress with such care. It looks brand new! Highly recommend their special care service.',
      date: '2025-01-25',
      status: 'approved',
      response: null
    },
    {
      id: '5',
      user: { name: 'Chris Brown', email: 'chris@email.com', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      orderId: '#LH123452',
      service: 'Wash & Fold',
      rating: 2,
      title: 'Not satisfied',
      comment: 'Missing items from my order. Customer service was helpful but the experience was frustrating.',
      date: '2025-01-22',
      status: 'pending',
      response: null
    },
  ];

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === activeTab);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getAverageRating = () => {
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach(r => dist[r.rating - 1]++);
    return dist.reverse();
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews & Feedback</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage customer reviews and ratings</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <FiStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{getAverageRating()}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiMessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Reviews</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <FiEye className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.filter(r => r.status === 'pending').length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiThumbsUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.filter(r => r.rating >= 4).length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Positive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {getRatingDistribution().map((count, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-12 text-sm text-gray-600 dark:text-gray-400">{5 - index} stars</span>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${(count / reviews.length) * 100}%` }}
                />
              </div>
              <span className="w-8 text-sm text-gray-600 dark:text-gray-400 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            {['all', 'pending', 'approved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FiFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div 
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src={review.user.image}
                  alt={review.user.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{review.user.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{review.user.email} • Order {review.orderId}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      review.status === 'approved'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">• {review.service}</span>
                </div>

                <h5 className="font-medium text-gray-900 dark:text-white mb-1">{review.title}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{review.comment}</p>

                {review.response && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Your Response:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{review.response}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {review.status === 'pending' && (
                    <>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                        <FiCheck className="w-4 h-4" />
                        Approve
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                        <FiX className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                  {!review.response && (
                    <button 
                      onClick={() => {
                        setSelectedReview(review as Review);
                        setShowResponseModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                    >
                      <FiMessageSquare className="w-4 h-4" />
                      Respond
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedReview && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowResponseModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Respond to Review</h3>
                <button 
                  onClick={() => setShowResponseModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(selectedReview.rating)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">&ldquo;{selectedReview.comment}&rdquo;</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">- {selectedReview.user.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Response</label>
                <textarea 
                  rows={4}
                  placeholder="Write your response to this review..."
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" 
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminReviewsPage;
