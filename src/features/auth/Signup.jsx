import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAd, setCurrentAd] = useState(0);
  
  // New state for username checking
  const [usernameStatus, setUsernameStatus] = useState({
    checking: false,
    available: null,
    suggestions: []
  });

  const ads = [
    {
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=700&fit=crop&crop=center',
      title: 'Start Your Journey',
      text: 'Join thousands of learners achieving their goals with expert guidance.'
    },
    {
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=700&fit=crop&crop=center',
      title: 'Learn & Grow Together',
      text: 'Connect with tutors and peers in our vibrant learning community.'
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop&crop=center',
      title: 'Achieve Excellence',
      text: 'Personalized learning paths designed for your success.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Debounced username checking
  useEffect(() => {
    if (formData.userName && /^[a-zA-Z0-9]{3,30}$/.test(formData.userName)) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(formData.userName);
      }, 500); // 500ms debounce

      return () => clearTimeout(timeoutId);
    } else {
      setUsernameStatus({ checking: false, available: null, suggestions: [] });
    }
  }, [formData.userName]);

  const checkUsernameAvailability = async (username) => {
    setUsernameStatus(prev => ({ ...prev, checking: true }));
    
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/check-username`, {
        params: { userName: username }
      });

      if (res.data.available) {
        setUsernameStatus({
          checking: false,
          available: true,
          suggestions: []
        });
      } else {
        setUsernameStatus({
          checking: false,
          available: false,
          suggestions: res.data.suggestions || []
        });
      }
    } catch (err) {
      console.error('Username check failed:', err);
      setUsernameStatus({
        checking: false,
        available: null,
        suggestions: []
      });
      toast.error('Could not verify username availability');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue
    }));

    // Clear general error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, userName: suggestion }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (formData.name.length < 2 || formData.name.length > 50) return 'Name must be between 2 and 50 characters';
    if (!formData.userName.trim()) return 'Username is required';
    if (!/^[a-zA-Z0-9]+$/.test(formData.userName)) return 'Username can only contain letters and numbers';
    if (formData.userName.length < 3 || formData.userName.length > 30) return 'Username must be between 3 and 30 characters';
    if (usernameStatus.available === false) return 'Please choose an available username';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.includes('@')) return 'Please enter a valid email';
    if (formData.password.length < 8) return 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.agreeToTerms) return 'Please agree to the terms and conditions';
    return null;
  };

const handleSignup = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    toast.error(validationError);
    setLoading(false);
    return;
  }

  try {
    // Destructure out confirmPassword and agreeToTerms (not needed by backend)
    const { confirmPassword, agreeToTerms, ...payload } = formData;

    // Use cleaned payload in API call
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, payload, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    toast.success('Account created! Please verify your email.');
    setTimeout(() => navigate('/login'), 1500);
  } catch (err) {
    console.error('Signup error:', err);
    const apiError = err.response?.data?.error;
    const errorMessage = apiError?.message || 'Signup failed';
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_theme(colors.blue.100/0.4),_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_theme(colors.indigo.100/0.3),_transparent_70%)]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Elegant Image Showcase */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative">
          <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
            <div className="relative h-full overflow-hidden">
              <img
                src={ads[currentAd].image}
                alt="Educational showcase"
                className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Elegant content overlay */}
          <div className="relative z-20 flex flex-col justify-end p-12 xl:p-16">
            <div className="max-w-lg transform transition-all duration-1000">
              <h3 className="text-4xl xl:text-5xl font-light text-white mb-6 leading-tight tracking-wide">
                {ads[currentAd].title}
              </h3>
              <p className="text-lg xl:text-xl text-white/90 leading-relaxed font-light">
                {ads[currentAd].text}
              </p>
            </div>
            
            {/* Minimalist indicators */}
            <div className="flex space-x-3 mt-12">
              {ads.map((_, index) => (
                <button
                  key={index}
                  className={`h-0.5 rounded-full transition-all duration-700 ${
                    index === currentAd 
                      ? 'w-12 bg-white' 
                      : 'w-6 bg-white/40 hover:bg-white/60'
                  }`}
                  onClick={() => setCurrentAd(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Clean Signup Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 lg:p-12 max-h-screen overflow-y-auto">
          <div className="w-full max-w-md py-8">
            {/* Clean, minimal card */}
            <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-light text-slate-800 mb-3 tracking-wide">Join Us Today</h2>
                <p className="text-slate-600 font-light">Create your account and start learning</p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/60 border border-blue-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all font-light"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Username with Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pr-12 bg-white/60 border rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-blue-500/50 backdrop-blur-sm transition-all font-light ${
                        usernameStatus.available === true 
                          ? 'border-green-300 focus:ring-green-500/50' 
                          : usernameStatus.available === false 
                          ? 'border-red-300 focus:ring-red-500/50' 
                          : 'border-blue-200/60 focus:ring-blue-500/50'
                      }`}
                      placeholder="Choose a username"
                      required
                    />
                    
                    {/* Status Icon */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {usernameStatus.checking && (
                        <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                      )}
                      {usernameStatus.available === true && (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      {usernameStatus.available === false && (
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Username Status Messages */}
                  {usernameStatus.available === true && (
                    <div className="flex items-center space-x-2 text-green-600 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-light">Username is available!</span>
                    </div>
                  )}
                  
                  {usernameStatus.available === false && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-light">Username is unavailable</span>
                      </div>
                      
                      {/* Suggestions */}
                      {usernameStatus.suggestions.length > 0 && (
                        <div className="bg-blue-50/80 border border-blue-200/60 rounded-2xl p-3 backdrop-blur-sm">
                          <p className="text-sm text-blue-700 font-medium mb-2">Try these suggestions:</p>
                          <div className="flex flex-wrap gap-2">
                            {usernameStatus.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm rounded-lg transition-colors font-light border border-blue-200/60"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/60 border border-blue-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all font-light"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/60 border border-blue-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all font-light"
                    placeholder="Create a password (min 8 characters)"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/60 border border-blue-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all font-light"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-3 py-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 bg-white/60 border-blue-200/60 rounded focus:ring-blue-500/50 focus:ring-2 backdrop-blur-sm"
                    required
                  />
                  <label className="text-sm text-slate-600 font-light leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {error && (
                  <div className="p-3 bg-red-50/80 border border-red-200/60 rounded-2xl backdrop-blur-sm">
                    <p className="text-red-600 text-sm font-light">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="font-light">Creating Account...</span>
                    </div>
                  ) : (
                    <span className="font-light tracking-wide">Create Account</span>
                  )}
                </button>
              </div>
            </div>

            {/* Subtle bottom link */}
            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm font-light">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;