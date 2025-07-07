import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMessage, faCalendarDays, faFolderOpen, faRightFromBracket, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Determine current page from URL if not provided
  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    
    const path = location.pathname;
    if (path.includes('/courses')) return 'courses';
    if (path.includes('/messages')) return 'messages';
    if (path.includes('/schedule')) return 'schedule';
    if (path.includes('/materials')) return 'materials';
    if (path.includes('/info')) return 'info';
    return 'courses'; // default
  };
  
  const activePage = getCurrentPage();
  
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };
  
  const handleLogoutConfirm = () => {
    // Clear any stored user data (localStorage, sessionStorage, etc.)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    
    // Navigate to home page
    navigate('/');
    setShowLogoutModal(false);
  };
  
  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };
  
  return (
    <>
      <div className="w-20 bg-black flex flex-col items-center py-8">
        {/* User Profile Picture */}
        <div className="mb-16">
          <div 
            className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white cursor-pointer hover:border-gray-300 transition-colors duration-200"
            onClick={() => navigate('/student/info')}
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" 
              alt="User Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Navigation Items Grouped Together */}
        <div className="flex flex-col items-center space-y-8">
        <div 
            className={`flex flex-col items-center space-y-2 cursor-pointer transition-opacity duration-200 ${
              activePage === 'courses' ? 'opacity-100 hover:opacity-80' : 'opacity-50 hover:opacity-70'
            }`}
            onClick={() => navigate('/student/courses')}
          >
            <div className={`w-8 h-8 flex items-center justify-center text-white ${
              activePage === 'courses' ? 'bg-white bg-opacity-20 rounded-lg' : ''
            }`}>
              <FontAwesomeIcon icon={faBook} className="text-lg" />
            </div>
            <span className={`text-xs text-white ${
              activePage === 'courses' ? 'font-medium' : ''
            }`}>Courses</span>
          </div>
          <div 
            className={`flex flex-col items-center space-y-2 cursor-pointer transition-opacity duration-200 ${
              activePage === 'messages' ? 'opacity-100 hover:opacity-80' : 'opacity-50 hover:opacity-70'
            }`}
            onClick={() => navigate('/student/messages')}
          >
            <div className={`w-8 h-8 flex items-center justify-center text-white ${
              activePage === 'messages' ? 'bg-white bg-opacity-20 rounded-lg' : ''
            }`}>
              <FontAwesomeIcon icon={faMessage} className="text-lg" />
            </div>
            <span className={`text-xs text-white ${
              activePage === 'messages' ? 'font-medium' : ''
            }`}>Messages</span>
          </div>
          <div 
            className={`flex flex-col items-center space-y-2 cursor-pointer transition-opacity duration-200 ${
              activePage === 'schedule' ? 'opacity-100 hover:opacity-80' : 'opacity-50 hover:opacity-70'
            }`}
            onClick={() => navigate('/student/schedule')}
          >
            <div className={`w-8 h-8 flex items-center justify-center text-white ${
              activePage === 'schedule' ? 'bg-white bg-opacity-20 rounded-lg' : ''
            }`}>
              <FontAwesomeIcon icon={faCalendarDays} className="text-lg" />
            </div>
            <span className={`text-xs text-white ${
              activePage === 'schedule' ? 'font-medium' : ''
            }`}>Schedule</span>
          </div>
          <div 
            className={`flex flex-col items-center space-y-2 cursor-pointer transition-opacity duration-200 ${
              activePage === 'materials' ? 'opacity-100 hover:opacity-80' : 'opacity-50 hover:opacity-70'
            }`}
            onClick={() => navigate('/student/materials')}
          >
            <div className={`w-8 h-8 flex items-center justify-center text-white ${
              activePage === 'materials' ? 'bg-white bg-opacity-20 rounded-lg' : ''
            }`}>
              <FontAwesomeIcon icon={faFolderOpen} className="text-lg" />
            </div>
            <span className={`text-xs text-white ${
              activePage === 'materials' ? 'font-medium' : ''
            }`}>Materials</span>
          </div>
        </div>
        
        {/* Logout at Bottom */}
        <div className="mt-auto">
          <div 
            className="flex flex-col items-center space-y-2 opacity-50 cursor-pointer hover:opacity-70 transition-opacity duration-200"
            onClick={handleLogoutClick}
          >
            <div className="w-8 h-8 flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
            </div>
            <span className="text-xs text-white">Log out</span>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Confirm Logout</h2>
              </div>
              <button
                onClick={handleLogoutCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTimes} className="text-lg" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Are you sure you want to log out? You will be redirected to the home page and will need to log in again to access your dashboard.
              </p>
            </div>
            
            {/* Modal Actions */}
            <div className="flex space-x-4">
              <button
                onClick={handleLogoutCancel}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar; 