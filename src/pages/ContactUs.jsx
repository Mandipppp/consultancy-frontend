import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const ContactUs = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: 'info@langzy.co',
    phone: '+977-98XXXXXXXX',
    address: 'Kathmandu, Nepal'
  });
  const [loadingInfo, setLoadingInfo] = useState(true);

  // Fetch contact information on component mount
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await api.get('/api/pages/contact-info');
        if (response.data.success) {
          setContactInfo(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoadingInfo(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const response = await api.post('/api/pages/contact', form);
      if (response.data.success) {
        setStatus('success');
        setForm({
          fullName: '',
          email: '',
          contactNumber: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions about our language programs? We'd love to hear from you! 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-blue-900 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-blue-900 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-blue-900 font-semibold mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="+977-98XXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-blue-900 font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="What can we help you with?"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                rows={6}
                placeholder="Tell us more about your inquiry or how we can assist you..."
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-green-800 font-semibold">Message Sent Successfully!</span>
                </div>
                <p className="text-green-700">Thank you for reaching out. We'll get back to you soon!</p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-red-800 font-semibold">Failed to Send Message</span>
                </div>
                <p className="text-red-700">Please try again or contact us directly.</p>
              </div>
            )}
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-blue-100 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
                         <h3 className="text-xl font-bold text-blue-900 mb-2">Email Us</h3>
             <p className="text-blue-700">{loadingInfo ? 'Loading...' : contactInfo.email}</p>
          </div>
          
          <div className="bg-blue-100 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
                         <h3 className="text-xl font-bold text-blue-900 mb-2">Call Us</h3>
             <p className="text-blue-700">{loadingInfo ? 'Loading...' : contactInfo.phone}</p>
          </div>
          
          <div className="bg-blue-100 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
                         <h3 className="text-xl font-bold text-blue-900 mb-2">Visit Us</h3>
             <p className="text-blue-700">{loadingInfo ? 'Loading...' : contactInfo.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
