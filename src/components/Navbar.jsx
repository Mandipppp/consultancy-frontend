import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo_sharp.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Show logo when scrolled down from hero section (around 400px)
      setShowLogo(currentScrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scrolling when location changes
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <nav className={`backdrop-blur-md border-b transition-all duration-300 ${
      scrollY > 50 
        ? 'bg-white/95 border-white/30 shadow-xl' 
        : 'bg-white/90 border-white/20 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={logo} 
                alt="Langzy Logo" 
                className={`h-10 w-auto transition-all duration-500 ease-out group-hover:scale-105 ${
                  showLogo 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-4'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-sky-50 rounded-lg"
            >
              Home
            </Link>
            <Link 
              to="/about-us" 
              className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-sky-50 rounded-lg"
            >
              About Us
            </Link>
            <Link 
              to="/#languages" 
              className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-sky-50 rounded-lg"
            >
              Languages
            </Link>
            <Link 
              to="/#pricing" 
              className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-sky-50 rounded-lg"
            >
              Pricing
            </Link>
            <Link 
              to="/#reviews" 
              className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-sky-50 rounded-lg"
            >
              Reviews
            </Link>
            <Link 
              to="/contact-us" 
              className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-sky-50 rounded-lg"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="text-gray-700 hover:text-sky-600 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-sky-50 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-sky-500 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-sky-600 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-sky-600 p-2 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/#languages"
                className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Languages
              </Link>
              <Link
                to="/#pricing"
                className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/#reviews"
                className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                to="/contact-us"
                className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-sky-600 hover:bg-sky-50 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-gradient-to-r from-sky-500 to-cyan-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:from-sky-600 hover:to-cyan-700 transition-all duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
