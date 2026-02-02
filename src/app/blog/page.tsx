'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FiClock, FiUser, FiTag, FiArrowRight } from 'react-icons/fi';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Ultimate Guide to Fabric Care: Tips for Every Material',
    excerpt: 'Learn how to properly care for different fabric types to keep your clothes looking new for years.',
    content: 'Proper fabric care is essential...',
    author: 'Sarah Johnson',
    date: 'Jan 15, 2026',
    readTime: '5 min read',
    category: 'Fabric Care',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=500&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: 'Eco-Friendly Laundry: How to Reduce Your Environmental Impact',
    excerpt: 'Discover sustainable laundry practices that are good for your clothes and the planet.',
    content: 'Going green with your laundry...',
    author: 'Michael Chen',
    date: 'Jan 12, 2026',
    readTime: '4 min read',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&h=500&fit=crop',
    featured: true,
  },
  {
    id: 3,
    title: 'Stain Removal 101: Common Stains and How to Treat Them',
    excerpt: 'From wine spills to grass stains, learn the best techniques to remove tough stains effectively.',
    content: 'Stain removal can be tricky...',
    author: 'Emily Davis',
    date: 'Jan 10, 2026',
    readTime: '6 min read',
    category: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    featured: false,
  },
  {
    id: 4,
    title: 'Why Professional Dry Cleaning is Worth It for Delicate Garments',
    excerpt: 'Understanding the benefits of professional dry cleaning for your expensive and delicate clothing.',
    content: 'Dry cleaning is more than just...',
    author: 'David Wilson',
    date: 'Jan 8, 2026',
    readTime: '5 min read',
    category: 'Dry Cleaning',
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=800&h=500&fit=crop',
    featured: false,
  },
  {
    id: 5,
    title: 'The Science Behind Wrinkle-Free Clothes',
    excerpt: 'Discover the technology and techniques that keep your clothes crisp and wrinkle-free.',
    content: 'Pressing and ironing science...',
    author: 'Lisa Anderson',
    date: 'Jan 5, 2026',
    readTime: '4 min read',
    category: 'Pressing',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&h=500&fit=crop',
    featured: false,
  },
  {
    id: 6,
    title: "Laundry Mistakes You're Probably Making (And How to Fix Them)",
    excerpt: 'Avoid these common laundry mistakes that can damage your clothes and waste your time.',
    content: 'Many people make these mistakes...',
    author: 'Robert Taylor',
    date: 'Jan 3, 2026',
    readTime: '7 min read',
    category: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&h=500&fit=crop',
    featured: false,
  },
];

const categories = ['All', 'Fabric Care', 'Sustainability', 'Tips & Tricks', 'Dry Cleaning', 'Pressing'];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <>

      <main className="min-h-screen bg-white pt-20 sm:pt-24 mb-10">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#0F2744] via-[#1a3a5c] to-[#0F2744] text-white py-12 sm:py-16 md:py-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Laundry Care Blog
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8">
                Expert tips, guides, and insights for keeping your clothes fresh and clean
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-white text-sm border-white sm:text-base  focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white border-b border-gray-100 sticky top-16 sm:top-20 z-40">
          <div className="container-custom px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-[#0F2744] text-white shadow-md'
                      : 'bg-transparent text-gray-600 hover:bg-transparent hover:text-[#0F2744'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container-custom px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Featured Posts */}
          {selectedCategory === 'All' && searchQuery === '' && (
            <section className="mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2744] mb-6 sm:mb-8 animate-fade-in">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {featuredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#0F2744] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <FiTag className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{post.category}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F2744] mb-2 sm:mb-3 group-hover:text-[#0F7BA0] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-700">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.date}</p>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${post.id}`}
                          className="flex items-center gap-1 sm:gap-2 text-[#0F7BA0] text-sm sm:text-base font-semibold hover:gap-3 transition-all"
                        >
                          Read More <FiArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2744] mb-6 sm:mb-8 animate-fade-in">
              {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
            </h2>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <p className="text-base sm:text-lg text-gray-500">No articles found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                        <div className="flex items-center gap-1">
                          <FiTag className="w-3 h-3" />
                          <span>{post.category}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0F2744] mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#0F7BA0] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <FiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm text-gray-600">{post.author}</span>
                        </div>
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-[#0F7BA0] text-xs sm:text-sm font-semibold hover:text-[#0F2744] transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Newsletter Section */}
          <section className="mt-12 sm:mt-16 md:mt-20 bg-linear-to-br from-[#0F2744] via-[#1a3a5c] to-[#0F2744] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Stay Updated with Laundry Tips
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest laundry care tips, tricks, and exclusive offers delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-[#0F2744] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
