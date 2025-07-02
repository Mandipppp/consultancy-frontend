import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toastManager from '../../utils/toastManager';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAd, setCurrentAd] = useState(0);

  // Elegant, professional vertical images
  const ads = [
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop&crop=center',
      title: 'Join IELTS Prep Now!',
      text: 'Expert-led live classes and guaranteed results.'
    },
    {
      image: 'https://images.unsplash.com/photo-1491841573337-862baa2c8c91?w=600&h=800&fit=crop&crop=center',
      title: 'Book Counseling Today',
      text: 'Get 1-on-1 career or visa guidance with ease.'
    },
    {
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=800&fit=crop&crop=center',
      title: 'Learn Languages Live',
      text: 'Interactive online lessons with global tutors.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('📤 Attempting to login with:', { email, password });

    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
      console.log('🌐 Sending POST request to:', url);

      const res = await axios.post(url, { email, password }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('✅ Login response:', res.data);

      const data = res.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Show success toast
      toastManager.success('Login successful! Redirecting...');

      // Delay redirect to show toast
      setTimeout(() => {
        switch (data.user.role) {
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'owner':
            navigate('/owner/dashboard');
            break;
          case 'tutor':
            navigate('/tutor/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/');
        }
      }, 1500); // 1.5 second delay
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      toastManager.error(err, err.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_theme(colors.blue.100/0.4),_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_theme(colors.indigo.100/0.3),_transparent_70%)]"></div>
      </div>

      <div className="relative z-10 h-full flex">
        {/* Left Side - Fixed Image Showcase */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
          <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
            <div className="relative w-full h-full">
              <img
                src={ads[currentAd].image}
                alt="Educational showcase"
                className="w-full h-full object-cover transition-all duration-1000"
                style={{ objectPosition: 'center center' }}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
            </div>
          </div>

          {/* Elegant content overlay */}
          <div className="relative z-20 flex flex-col justify-end p-8 lg:p-12 xl:p-16">
            <div className="max-w-lg transform transition-all duration-1000">
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-4 lg:mb-6 leading-tight tracking-wide">
                {ads[currentAd].title}
              </h3>
              <p className="text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed font-light">
                {ads[currentAd].text}
              </p>
            </div>

            {/* Minimalist indicators */}
            <div className="flex space-x-3 mt-8 lg:mt-12">
              {ads.map((_, index) => (
                <button
                  key={index}
                  className={`h-0.5 rounded-full transition-all duration-700 ${index === currentAd
                      ? 'w-12 bg-white'
                      : 'w-6 bg-white/40 hover:bg-white/60'
                    }`}
                  onClick={() => setCurrentAd(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Clean Login Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Clean, minimal card */}
            <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
              <div className="text-center mb-8 lg:mb-10">
                <h2 className="text-2xl lg:text-3xl font-light text-slate-800 mb-3 tracking-wide">Welcome Back</h2>
                <p className="text-slate-600 font-light text-sm lg:text-base">Sign in to continue your learning journey</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Email Address or Username</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 lg:py-4 bg-white/60 border border-blue-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all font-light text-sm lg:text-base"
                    placeholder="Enter your email or username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 lg:py-4 bg-white/60 border border-blue-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all font-light text-sm lg:text-base"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50/80 border border-red-200/60 rounded-2xl backdrop-blur-sm">
                    <p className="text-red-600 text-sm font-light">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="font-light">Signing In...</span>
                    </div>
                  ) : (
                    <span className="font-light tracking-wide">Sign In</span>
                  )}
                </button>
              </div>

              <div className="mt-6 lg:mt-8 text-center">
                <a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-light transition-colors tracking-wide">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Subtle bottom link */}
            <div className="mt-6 lg:mt-8 text-center">
              <p className="text-slate-500 text-sm font-light">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Create one here
                </Link>

              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;