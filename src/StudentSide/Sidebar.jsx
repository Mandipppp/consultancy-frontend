import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMessage, faCalendarDays, faFolderOpen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="w-20 bg-black flex flex-col items-center py-8">
      {/* User Profile Picture */}
      <div className="mb-16">
        <div 
          className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white cursor-pointer hover:border-gray-300 transition-colors duration-200"
          onClick={() => window.location.href = '/student/info'}
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
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faBook} className="text-lg" />
          </div>
          <span className="text-xs text-white font-medium">Courses</span>
        </div>
        <div className="flex flex-col items-center space-y-2 opacity-50">
          <div className="w-8 h-8 flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faMessage} className="text-lg" />
          </div>
          <span className="text-xs text-white">Messages</span>
        </div>
        <div className="flex flex-col items-center space-y-2 opacity-50">
          <div className="w-8 h-8 flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faCalendarDays} className="text-lg" />
          </div>
          <span className="text-xs text-white">Schedule</span>
        </div>
        <div className="flex flex-col items-center space-y-2 opacity-50">
          <div className="w-8 h-8 flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faFolderOpen} className="text-lg" />
          </div>
          <span className="text-xs text-white">Materials</span>
        </div>
      </div>
      
      {/* Logout at Bottom */}
      <div className="mt-auto">
        <div className="flex flex-col items-center space-y-2 opacity-50">
          <div className="w-8 h-8 flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
          </div>
          <span className="text-xs text-white">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 