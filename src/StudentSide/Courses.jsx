import React, { useState } from 'react';
import logoSharp from '../assets/images/logo_sharp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faBook, faFileAlt, faDownload, faBell, faTimes, faCheck, faExclamationTriangle, faPlay, faStar, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: 'German A1',
      description: 'This course covers all the essentials you require to start a conversation in German. Guided by experienced tutors.',
      level: 'All Levels',
      flag: 'https://flagcdn.com/w40/de.png',
      status: 'active',
      introduction: 'Master the fundamentals of German language with our comprehensive A1 course. This beginner-friendly program is designed to help you build a strong foundation in German vocabulary, grammar, and pronunciation. You\'ll learn essential phrases for everyday situations, basic sentence structures, and cultural insights that will make your German learning journey both effective and enjoyable.',
      tutor: {
        name: 'Binod Chalise',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
        experience: '5 years',
        specialization: 'German Language & Culture',
        rating: 4.8
      },
      video: {
        title: 'German A1 - Course Introduction',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop',
        duration: '3:45'
      },
      courseContent: [
        { module: 'Module 1', title: 'Basic Greetings & Introductions', duration: '2 hours', completed: true },
        { module: 'Module 2', title: 'Numbers & Time', duration: '1.5 hours', completed: true },
        { module: 'Module 3', title: 'Family & Relationships', duration: '2 hours', completed: false },
        { module: 'Module 4', title: 'Daily Routines', duration: '1.5 hours', completed: false },
        { module: 'Module 5', title: 'Food & Dining', duration: '2 hours', completed: false }
      ]
    },
    {
      id: 2,
      title: 'German A2',
      description: 'This course covers all the essentials you require to start a conversation in German. Guided by experienced tutors.',
      level: 'All Levels',
      flag: 'https://flagcdn.com/w40/de.png',
      status: 'active',
      introduction: 'Build upon your German A1 foundation with our intermediate A2 course. This program focuses on expanding your vocabulary, improving conversational skills, and understanding more complex grammatical structures. You\'ll learn to express opinions, describe experiences, and handle more sophisticated everyday situations in German.',
      tutor: {
        name: 'Ganesh Parajuli',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
        experience: '7 years',
        specialization: 'Advanced German Grammar',
        rating: 4.9
      },
      video: {
        title: 'German A2 - Course Overview',
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=225&fit=crop',
        duration: '4:12'
      },
      courseContent: [
        { module: 'Module 1', title: 'Past Tense & Storytelling', duration: '2.5 hours', completed: false },
        { module: 'Module 2', title: 'Travel & Transportation', duration: '2 hours', completed: false },
        { module: 'Module 3', title: 'Shopping & Services', duration: '1.5 hours', completed: false },
        { module: 'Module 4', title: 'Health & Body', duration: '2 hours', completed: false },
        { module: 'Module 5', title: 'Hobbies & Leisure', duration: '2 hours', completed: false }
      ]
    },
    {
      id: 3,
      title: 'German B1',
      description: 'This course covers all the essentials you require to start a conversation in German. Guided by experienced tutors.',
      level: 'All Levels',
      flag: 'https://flagcdn.com/w40/de.png',
      status: 'completed',
      introduction: 'Congratulations on completing your German B1 course! This intermediate level program has equipped you with the skills to handle most everyday situations in German. You\'ve mastered complex grammar structures, expanded your vocabulary significantly, and developed the confidence to engage in meaningful conversations with native speakers.',
      tutor: {
        name: 'Binod Chalise',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
        experience: '5 years',
        specialization: 'German Language & Culture',
        rating: 4.8
      },
      video: {
        title: 'German B1 - Course Summary',
        thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=225&fit=crop',
        duration: '5:20'
      },
      courseContent: [
        { module: 'Module 1', title: 'Complex Grammar Structures', duration: '3 hours', completed: true },
        { module: 'Module 2', title: 'Professional Communication', duration: '2.5 hours', completed: true },
        { module: 'Module 3', title: 'Cultural Understanding', duration: '2 hours', completed: true },
        { module: 'Module 4', title: 'Advanced Conversations', duration: '2.5 hours', completed: true },
        { module: 'Module 5', title: 'Final Assessment', duration: '1 hour', completed: true }
      ]
    }
  ];



  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Course Completed',
      message: 'Congratulations! You have completed German Level A1.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Course Available',
      message: 'German Level A2 is now available for enrollment.',
      time: '3 hours ago',
      read: false
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

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return course.status === 'active';
    if (activeTab === 'Completed') return course.status === 'completed';
    return true;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container with Black Background */}
      <div className="flex-1 bg-black p-4">
        <div className="bg-white rounded-2xl h-full flex overflow-hidden">
          {/* Main Content */}
                                <div className="flex-1 p-8 relative bg-gray-100 flex flex-col">
                          <div className="w-full flex-1 flex flex-col">
               <div className="flex space-x-8 flex-1">
                 {/* Courses Section - Left Half */}
                 <div className="flex-1">
                   <div className="bg-white rounded-2xl p-6 shadow-sm h-full overflow-y-auto">
                     {/* Header */}
                     <div className="mb-8">
                       <h1 className="text-3xl font-bold text-gray-800 mb-6">Courses</h1>
                       
                       {/* Tabs */}
                       <div className="flex space-x-8 border-b border-gray-200">
                         {['All', 'Active', 'Completed'].map((tab) => (
                           <button
                             key={tab}
                             onClick={() => setActiveTab(tab)}
                             className={`pb-4 px-2 text-sm font-medium transition-colors duration-200 ${
                               activeTab === tab
                                 ? 'text-gray-800 border-b-2 border-gray-800'
                                 : 'text-gray-500 hover:text-gray-700'
                             }`}
                           >
                             {tab}
                           </button>
                         ))}
                       </div>
                     </div>
                     
                     <div className="space-y-6">
                       {filteredCourses.map((course) => (
                         <div 
                           key={course.id} 
                           className={`p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 ${
                             selectedCourse?.id === course.id 
                               ? 'border-blue-500 bg-blue-50' 
                               : 'border-gray-200 bg-white hover:border-gray-300'
                           }`}
                           onClick={() => setSelectedCourse(course)}
                         >
                           <div className="flex items-start space-x-4">
                             {/* Course Flag/Image */}
                             <div className="flex-shrink-0">
                               <div className="w-20 h-14 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-black via-red-600 to-yellow-400 flex items-center justify-center">
                                 <img 
                                   src={course.flag} 
                                   alt={`${course.title} Flag`} 
                                   className="w-12 h-8 object-cover rounded"
                                 />
                               </div>
                             </div>
                             
                             {/* Course Details */}
                             <div className="flex-1">
                               <div className="flex items-center justify-between mb-2">
                                 <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                                 <span className="text-sm text-gray-500">⭐ {course.level}</span>
                               </div>
                               <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                 {course.description}
                               </p>
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-4">
                                   <span className="text-xs text-gray-500">📚 {course.level}</span>
                                 </div>
                                 <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-200">
                                   Continue
                                 </button>
                               </div>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>

                 {/* About Course Section - Right Half */}
                 <div className="flex-1 relative">
                   {/* Logo positioned at top right */}
                   <div className="absolute top-4 right-8 z-20">
                     <img 
                       src={logoSharp} 
                       alt="Langzy Logo" 
                       className="h-16 w-auto"
                     />
                   </div>
                   
                   {selectedCourse ? (
                     <div className="bg-white rounded-2xl p-6 shadow-sm h-full overflow-y-auto">
                       <div className="flex items-center space-x-3 mb-6">
                         <h2 className="text-xl font-semibold text-gray-800">About Course</h2>
                         <button 
                           onClick={() => setSelectedCourse(null)}
                           className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                         >
                           <FontAwesomeIcon icon={faTimes} className="text-sm" />
                         </button>
                       </div>
                       
                       {/* Course Video */}
                       <div className="mb-6">
                         <div className="relative rounded-lg overflow-hidden">
                           <img 
                             src={selectedCourse.video.thumbnail} 
                             alt={selectedCourse.video.title}
                             className="w-full h-32 object-cover"
                           />
                           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                               <FontAwesomeIcon icon={faPlay} className="text-gray-700 text-lg ml-1" />
                             </div>
                           </div>
                           <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                             {selectedCourse.video.duration}
                           </div>
                         </div>
                         <h3 className="text-sm font-medium text-gray-800 mt-2">{selectedCourse.video.title}</h3>
                       </div>

                       {/* Course Introduction */}
                       <div className="mb-6">
                         <h3 className="text-lg font-medium text-gray-800 mb-3">Introduction</h3>
                         <p className="text-sm text-gray-600 leading-relaxed">
                           {selectedCourse.introduction}
                         </p>
                       </div>

                       {/* Tutor Information */}
                       <div className="mb-6">
                         <h3 className="text-lg font-medium text-gray-800 mb-3">Your Tutor</h3>
                         <div className="flex items-center space-x-3">
                           <img 
                             src={selectedCourse.tutor.image} 
                             alt={selectedCourse.tutor.name}
                             className="w-12 h-12 rounded-full object-cover"
                           />
                           <div>
                             <h4 className="font-medium text-gray-800">{selectedCourse.tutor.name}</h4>
                             <p className="text-xs text-gray-600">{selectedCourse.tutor.specialization}</p>
                             <div className="flex items-center space-x-2 mt-1">
                               <div className="flex items-center space-x-1">
                                 <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                                 <span className="text-xs text-gray-600">{selectedCourse.tutor.rating}</span>
                               </div>
                               <span className="text-xs text-gray-400">•</span>
                               <span className="text-xs text-gray-600">{selectedCourse.tutor.experience}</span>
                             </div>
                           </div>
                         </div>
                       </div>

                       {/* Course Content */}
                       <div>
                         <h3 className="text-lg font-medium text-gray-800 mb-3">Course Content</h3>
                         <div className="space-y-2">
                           {selectedCourse.courseContent.map((module, index) => (
                             <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                               <div className="flex items-center space-x-3">
                                 <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                   module.completed ? 'bg-green-500' : 'bg-gray-300'
                                 }`}>
                                   {module.completed ? (
                                     <FontAwesomeIcon icon={faCheckCircle} className="text-white text-xs" />
                                   ) : (
                                     <span className="text-white text-xs">{index + 1}</span>
                                   )}
                                 </div>
                                 <div>
                                   <h4 className="text-sm font-medium text-gray-800">{module.title}</h4>
                                   <p className="text-xs text-gray-600">{module.module}</p>
                                 </div>
                               </div>
                               <div className="flex items-center space-x-1">
                                 <FontAwesomeIcon icon={faClock} className="text-gray-400 text-xs" />
                                 <span className="text-xs text-gray-600">{module.duration}</span>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>
                                        ) : (
                       <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex items-center justify-center">
                         <div className="text-center text-gray-400">
                           <FontAwesomeIcon icon={faBook} className="text-4xl mb-4" />
                           <h3 className="text-lg font-medium text-gray-600 mb-2">Select a Course</h3>
                           <p className="text-sm">Click on any course to view details</p>
                         </div>
                       </div>
                     )}
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

export default Courses; 