import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <Navbar />
        
        <div className="h-[calc(100vh-80px)] flex">
        {/* Left Side - Contact Information */}
        <div className="w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden flex flex-col justify-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute top-32 right-16 w-12 h-12 bg-white rounded-full"></div>
            <div className="absolute bottom-16 left-16 w-10 h-10 bg-white rounded-full"></div>
            <div className="absolute bottom-32 right-8 w-18 h-18 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 text-white px-6 py-4 mx-4 my-2">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-blue-100 text-sm leading-relaxed max-w-xs mx-auto">
                Ready to start your language learning journey? We're here to help you.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-xl font-bold text-white mb-1">10,000+</div>
                <div className="text-blue-200 text-xs">Happy Students</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-xl font-bold text-white mb-1">25+</div>
                <div className="text-blue-200 text-xs">Languages</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-xl font-bold text-white mb-1">24/7</div>
                <div className="text-blue-200 text-xs">Support</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-xl font-bold text-white mb-1">95%</div>
                <div className="text-blue-200 text-xs">Success Rate</div>
              </div>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-3 mb-5">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full p-2 mr-3 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-200 text-xs font-medium">Email us</p>
                    <p className="text-white text-sm font-semibold">{loadingInfo ? 'Loading...' : contactInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-full p-2 mr-3 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-200 text-xs font-medium">Call us</p>
                    <p className="text-white text-sm font-semibold">{loadingInfo ? 'Loading...' : contactInfo.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-2 mr-3 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-200 text-xs font-medium">Visit us</p>
                    <p className="text-white text-sm font-semibold">{loadingInfo ? 'Loading...' : contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Banner */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-400 rounded-full p-1.5 mr-2">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs">We're Online!</p>
                    <p className="text-blue-200 text-xs">Response: 2 hours</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-xs font-medium">Mon-Fri: 9AM-6PM</p>
                  <p className="text-blue-200 text-xs">Sat: 10AM-4PM</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-1/2 bg-white flex flex-col">
          <div className="flex-1 p-8 flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600 text-sm">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="grid grid-cols-1 gap-4 flex-1">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="+977-98XXXXXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full h-24 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center mt-3">
                    <div className="flex items-center justify-center mb-1">
                      <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-green-800 font-semibold text-sm">Message Sent!</span>
                    </div>
                    <p className="text-green-700 text-xs">Thank you for reaching out. We'll get back to you soon!</p>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center mt-3">
                    <div className="flex items-center justify-center mb-1">
                      <svg className="w-4 h-4 text-red-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-red-800 font-semibold text-sm">Failed to Send</span>
                    </div>
                    <p className="text-red-700 text-xs">Please try again or contact us directly.</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ContactUs;
