'use client';

import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import Link from 'next/link';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: <FiPhone className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Phone',
      details: ['Main: (239) 555-0108', 'Support: (239) 555-0109'],
      link: 'tel:+12395550108',
    },
    {
      icon: <FiMail className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Email',
      details: ['info@cleanpress.com', 'support@cleanpress.com'],
      link: 'mailto:info@cleanpress.com',
    },
    {
      icon: <FiMapPin className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Address',
      details: ['2118 Thornridge Cir, Syracuse', 'New York, NY 13210'],
      link: 'https://maps.google.com',
    },
    {
      icon: <FiClock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Business Hours',
      details: ['Mon - Sat: 8:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      link: null,
    },
  ];

  const locations = [
    {
      name: 'Downtown Location',
      address: '2118 Thornridge Cir, Syracuse, NY',
      phone: '(239) 555-0108',
      hours: 'Mon-Sat: 8AM-8PM',
    },
    {
      name: 'Westside Location',
      address: '3461 Whittier Ave, Syracuse, NY',
      phone: '(239) 555-0109',
      hours: 'Mon-Sat: 8AM-8PM',
    },
    {
      name: 'Eastside Location',
      address: '4234 Lighthouse Ln, Syracuse, NY',
      phone: '(239) 555-0110',
      hours: 'Mon-Sat: 8AM-8PM',
    },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <main className="min-h-screen bg-white pt-20 sm:pt-24 mb-10">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#0F2744] via-[#1a3a5c] to-[#0F2744] text-white py-12 sm:py-16 md:py-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Get in Touch
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200">
                Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 sm:py-16">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#0F7BA0]/10 rounded-full text-[#0F7BA0] mb-4 sm:mb-6">
                    {info.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F2744] mb-3 sm:mb-4">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-gray-600 mb-1">
                      {info.link && idx === 0 ? (
                        <a href={info.link} className="hover:text-[#0F7BA0] transition-colors">
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2744] mb-2 sm:mb-3">
                    Send us a Message
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>

                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                      <p className="text-sm sm:text-base text-green-700">
                        ✓ Message sent successfully! We&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#0F2744] mb-2">
                        <FiUser className="w-4 h-4" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.name ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#0F2744] mb-2">
                        <FiMail className="w-4 h-4" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#0F2744] mb-2">
                        <FiPhone className="w-4 h-4" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20`}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && (
                        <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#0F2744] mb-2">
                        <FiMessageSquare className="w-4 h-4" />
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.subject ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20`}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="service">Service Question</option>
                        <option value="pricing">Pricing Information</option>
                        <option value="complaint">Complaint</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership Opportunity</option>
                      </select>
                      {errors.subject && (
                        <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-[#0F2744] mb-2">
                        <FiMessageSquare className="w-4 h-4" />
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 border ${
                          errors.message ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20 resize-none`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && (
                        <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0F2744] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#1a3a5c] transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Map / Locations */}
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg h-full">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2744] mb-6 sm:mb-8">
                    Our Locations
                  </h2>
                  <div className="space-y-6">
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-[#0F7BA0] pl-4 sm:pl-6 py-2"
                      >
                        <h3 className="text-lg sm:text-xl font-bold text-[#0F2744] mb-2">
                          {location.name}
                        </h3>
                        <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                          <p className="flex items-start gap-2">
                            <FiMapPin className="w-4 h-4 text-[#0F7BA0] shrink-0 mt-0.5" />
                            {location.address}
                          </p>
                          <p className="flex items-center gap-2">
                            <FiPhone className="w-4 h-4 text-[#0F7BA0] shrink-0" />
                            {location.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <FiClock className="w-4 h-4 text-[#0F7BA0] shrink-0" />
                            {location.hours}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Map Placeholder */}
                  <div className="mt-8 rounded-xl overflow-hidden h-64 sm:h-80 bg-gray-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.5474545454545!2d-76.147!3d43.0481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDAyJzUzLjIiTiA3NsKwMDgnNDkuMiJX!5e0!3m2!1sen!2sus!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="CleanPress Locations"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-[#0F2744] via-[#1a3a5c] to-[#0F2744] text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 animate-fade-in">
              Need Quick Answers?
            </h2>
            <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              Check out our FAQ page for instant answers to common questions about our services, pricing, and more.
            </p>
            <Link
              href="/#faq"
              className="inline-block bg-white text-[#0F2744] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: '200ms' }}
            >
              Visit FAQ Section
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
