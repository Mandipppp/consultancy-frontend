import React, { useState } from 'react';
import logoSharp from '../assets/images/logo_sharp.png';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPen, faGear, faMedal, faClock, faQuestionCircle, faBullseye, faBell, faTimes, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

const Info = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const weeklyStats = [
    { day: 'Sun', value: 0 },
    { day: 'Mon', value: 180 },
    { day: 'Tue', value: 120 },
    { day: 'Wed', value: 200 },
    { day: 'Thu', value: 150 },
    { day: 'Fri', value: 250 },
    { day: 'Sat', value: 100 }
  ];

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Assignment Submitted',
      message: 'Your grammar exercise has been successfully submitted.',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Class Reminder',
      message: 'German Session 12 starts in 30 minutes.',
      time: '28 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Study Material',
      message: 'New vocabulary list has been added to your course.',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Progress Update',
      message: 'You have completed 75% of this week\'s learning goals.',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Tutor Message',
      message: 'Binod Chalise has left feedback on your last assignment.',
      time: 'Yesterday',
      read: true
    }
  ];

  const toggleNotificationPanel = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return faCheck;
      case 'warning':
        return faExclamationTriangle;
      case 'info':
      default:
        return faBell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container with Black Background */}
      <div className="flex-1 bg-black p-4">
        <div className="bg-white rounded-2xl h-full flex overflow-hidden">
          {/* Profile Section */}
          <div className="w-80 bg-white p-8 flex flex-col border-r border-gray-200">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center mb-3">Ashok Dhungana</h2>
              <div className="flex items-center justify-between w-full mb-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <FontAwesomeIcon icon={faPen} className="text-sm" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <FontAwesomeIcon icon={faGear} className="text-sm" />
                </button>
              </div>
              <hr className="w-full border-gray-200 mb-4" />
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
              This is Ashok. I am eager to learn new languages, and also eager to go abroad. So two eagers combined... Yeahhhh!!!
            </p>
            
            <div className="mt-auto flex justify-center">
              <div className="bg-slate-800 text-white px-4 py-3 rounded-full flex items-center space-x-3">
                <FontAwesomeIcon icon={faMedal} className="text-lg text-white-400" />
                <span className="font-bold text-lg">100</span>
                <span className="text-sm opacity-80">PT</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto relative bg-gray-100">
                    {/* Logo positioned at top right */}
            <div className="absolute top-4 right-8 z-10">
              <img 
                src={logoSharp} 
                alt="Langzy Logo" 
                className="h-16 w-auto"
              />
            </div>
        
        <div className="max-w-6xl space-y-10">
          {/* Announcements Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6 opacity-70">Announcements</h3>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-3">
              {/* Important Announcement */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faBell} className="text-yellow-600 text-sm mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 text-sm mb-1">Holiday Notice</h4>
                    <p className="text-xs text-yellow-700">Classes will be suspended on December 25th for Christmas. Regular schedule resumes December 26th.</p>
                  </div>
                </div>
              </div>

              {/* General Announcement */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faBell} className="text-blue-600 text-sm mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 text-sm mb-1">New Study Materials Available</h4>
                    <p className="text-xs text-blue-700">Updated German grammar exercises and vocabulary lists have been uploaded to your learning portal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Separator Line */}
          <hr className="border-gray-200 my-8" />

          {/* Languages Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6 opacity-70">Languages</h3>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start space-x-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-3xl text-white w-64">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-8 rounded-md overflow-hidden shadow-lg">
                    <img 
                      src="https://flagcdn.com/w40/de.png" 
                      alt="German Flag" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">A1</span>
                </div>
                <div className="mb-3">
                  <h4 className="font-bold text-xl">German</h4>
                </div>
                <div className="flex items-center space-x-2 text-sm opacity-90">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
                  <span>June 30</span>
                </div>
              </div>
              <div className="w-48 h-40 border-2 border-dashed border-gray-300 rounded-3xl flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                <span className="text-5xl text-gray-400">+</span>
                              </div>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <hr className="border-gray-200 my-8" />

          {/* Upcoming Tasks Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6 opacity-70">Upcoming Tasks</h3>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {/* Class Task */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-blue-600 bg-gradient-to-r from-blue-100 to-blue-200 px-2 py-1 rounded-full font-medium">Class</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-900 text-sm mb-1">German Session 12</h4>
                          <p className="text-xs text-blue-700">with Binod Chalise</p>
                        </div>
                        <div className="text-xs text-blue-600 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
                            <span>Today, 3:00 PM</span>
                          </div>
                          <div className="flex items-center justify-end space-x-1">
                            <FontAwesomeIcon icon={faClock} className="text-xs" />
                            <span>60 min</span>
                          </div>
                        </div>
                      </div>
                    </div>

                                  {/* Assignment Task */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-orange-600 bg-gradient-to-r from-orange-100 to-orange-200 px-2 py-1 rounded-full font-medium">Assignment</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-semibold text-orange-900 text-sm mb-1">Grammar Exercise</h4>
                          <p className="text-xs text-orange-700">Chapter 3 conjugation</p>
                        </div>
                        <div className="text-xs text-orange-600 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
                            <span>Due: Tomorrow</span>
                          </div>
                          <div className="flex items-center justify-end space-x-1">
                            <FontAwesomeIcon icon={faQuestionCircle} className="text-xs" />
                            <span>15 questions</span>
                          </div>
                        </div>
                      </div>
                    </div>

                                  {/* Review Task */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-green-600 bg-gradient-to-r from-green-100 to-green-200 px-2 py-1 rounded-full font-medium">Review</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-900 text-sm mb-1">Weekly Review</h4>
                          <p className="text-xs text-green-700">Vocabulary & grammar</p>
                        </div>
                        <div className="text-xs text-green-600 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
                            <span>Friday, 2:00 PM</span>
                          </div>
                          <div className="flex items-center justify-end space-x-1">
                            <FontAwesomeIcon icon={faBullseye} className="text-xs" />
                            <span>Self-paced</span>
                          </div>
                        </div>
                      </div>
                    </div>

              {/* Additional tasks can be added here */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500 p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-purple-600 bg-gradient-to-r from-purple-100 to-purple-200 px-2 py-1 rounded-full font-medium">Quiz</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Vocabulary Quiz</h4>
                    <p className="text-xs text-purple-700">Units 1-3 words</p>
                  </div>
                  <div className="text-xs text-purple-600 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
                      <span>Next Monday</span>
                    </div>
                    <div className="flex items-center justify-end space-x-1">
                      <FontAwesomeIcon icon={faClock} className="text-xs" />
                      <span>20 min</span>
                    </div>
                                  </div>
              </div>
            </div>
          </div>
          </div>
          </div>

          {/* Separator Line */}
          <hr className="border-gray-200 my-8" />

          {/* Statistics Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6 opacity-70">Statistics</h3>
            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-6">
              <div className="flex-1">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyStats}
                      margin={{
                        top: 30,
                        right: 30,
                        left: 20,
                        bottom: 40,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        tickMargin={12}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        tickMargin={12}
                        domain={[0, 300]}
                        ticks={[0, 50, 100, 150, 200, 250, 300]}
                        interval={0}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: '500',
                          padding: '12px 16px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                        }}
                        labelStyle={{
                          color: '#e5e7eb',
                          marginBottom: '4px'
                        }}
                        formatter={(value, name) => [
                          `${value} minutes`,
                          'Study Time'
                        ]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ 
                          fill: '#3b82f6', 
                          strokeWidth: 2, 
                          stroke: '#ffffff',
                          r: 5 
                        }}
                        activeDot={{ 
                          r: 7, 
                          fill: '#3b82f6',
                          stroke: '#ffffff',
                          strokeWidth: 3
                        }}
                        animationDuration={1000}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Progress Section - Right Side */}
              <div className="flex flex-col justify-center h-80 ml-8">
                <div className="bg-gray-900 rounded-2xl p-6 text-white w-48 h-64 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold mb-6 text-white">Progress</h3>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-300">Consistency</div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold">20</span>
                      <span className="text-xl text-gray-300">/30</span>
                      <span className="text-sm text-gray-400 ml-2">days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <hr className="border-gray-200 my-8" />

          {/* Assigned Tutors Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6 opacity-70">Assigned Tutors</h3>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex space-x-8">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mx-auto mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face" 
                    alt="Tutor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-700">Binod Chalise</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mx-auto mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face" 
                    alt="Tutor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-700">Ganesh Parajuli</p>
              </div>
            </div>
          </div>
          </div>
          </div>
                  </div>
        </div>
        
        {/* Floating Notification Button - Bottom Right */}
        <div className="fixed bottom-10 right-10 z-50">
          <div className="relative">
            <button 
              onClick={toggleNotificationPanel}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200"
            >
              <FontAwesomeIcon icon={faBell} className="text-gray-600 text-lg" />
            </button>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>
        </div>

        {/* Notification Panel Overlay */}
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isNotificationOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Dark Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
            onClick={toggleNotificationPanel}
          ></div>
          
          {/* Notification Panel */}
          <div className={`absolute right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isNotificationOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              <button 
                onClick={toggleNotificationPanel}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTimes} className="text-lg" />
              </button>
            </div>
            
            {/* Notifications List */}
            <div className="h-full overflow-y-auto pb-20">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${getNotificationColor(notification.type)}`}>
                      <FontAwesomeIcon icon={getNotificationIcon(notification.type)} className="text-sm" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 text-sm">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty State */}
              {notifications.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <FontAwesomeIcon icon={faBell} className="text-4xl mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
