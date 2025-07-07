import React, { useState, useEffect } from 'react';
import logoSharp from '../assets/images/logo_sharp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faBook, faFileAlt, faDownload, faBell, faTimes, faCheck, faExclamationTriangle, faPlay, faStar, faCheckCircle, faClock, faGraduationCap, faFile, faFilePdf, faFileWord, faFileVideo, faEye } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

const Material = () => {
  const [activeTab, setActiveTab] = useState('All Courses');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const materials = [
    {
      id: 1,
      courseId: 1,
      courseName: 'German A1',
      courseLevel: 'Beginner',
      flag: 'https://flagcdn.com/w40/de.png',
      materials: [
        {
          id: 1,
          title: 'German A1 - Lesson 1: Basic Greetings',
          type: 'pdf',
          size: '2.3 MB',
          uploadDate: '2024-01-15',
          downloadCount: 45,
          description: 'Complete guide to basic German greetings and introductions. Includes pronunciation guide and practice exercises.',
          url: 'https://example.com/german-a1-lesson1.pdf',
          preview: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop'
        },
        {
          id: 2,
          title: 'German A1 - Audio Practice: Numbers',
          type: 'audio',
          size: '8.5 MB',
          uploadDate: '2024-01-18',
          downloadCount: 38,
          description: 'Audio exercises for learning German numbers from 1-100. Native speaker pronunciation with repeat exercises.',
          url: 'https://example.com/german-a1-numbers.mp3',
          preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop'
        },
        {
          id: 3,
          title: 'German A1 - Vocabulary Worksheet',
          type: 'docx',
          size: '1.8 MB',
          uploadDate: '2024-01-20',
          downloadCount: 52,
          description: 'Interactive vocabulary worksheet covering family members, professions, and daily activities.',
          url: 'https://example.com/german-a1-vocabulary.docx',
          preview: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=225&fit=crop'
        },
        {
          id: 4,
          title: 'German A1 - Grammar Guide Video',
          type: 'video',
          size: '125 MB',
          uploadDate: '2024-01-22',
          downloadCount: 67,
          description: 'Comprehensive video guide covering basic German grammar rules, sentence structure, and common patterns.',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          preview: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 2,
      courseId: 2,
      courseName: 'German A2',
      courseLevel: 'Intermediate',
      flag: 'https://flagcdn.com/w40/de.png',
      materials: [
        {
          id: 5,
          title: 'German A2 - Advanced Grammar Rules',
          type: 'pdf',
          size: '3.7 MB',
          uploadDate: '2024-01-10',
          downloadCount: 28,
          description: 'Detailed explanation of advanced German grammar including subjunctive mood, passive voice, and complex sentence structures.',
          url: 'https://example.com/german-a2-grammar.pdf',
          preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop'
        },
        {
          id: 6,
          title: 'German A2 - Conversation Practice',
          type: 'audio',
          size: '15.2 MB',
          uploadDate: '2024-01-12',
          downloadCount: 34,
          description: 'Real-life conversation scenarios for intermediate German learners. Includes shopping, dining, and travel situations.',
          url: 'https://example.com/german-a2-conversation.mp3',
          preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop'
        },
        {
          id: 7,
          title: 'German A2 - Cultural Insights',
          type: 'video',
          size: '89 MB',
          uploadDate: '2024-01-14',
          downloadCount: 41,
          description: 'Explore German culture, traditions, and social customs. Understanding context for better language learning.',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          preview: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=225&fit=crop'
        }
      ]
    },
    {
      id: 3,
      courseId: 3,
      courseName: 'German B1',
      courseLevel: 'Upper Intermediate',
      flag: 'https://flagcdn.com/w40/de.png',
      materials: [
        {
          id: 8,
          title: 'German B1 - Business German',
          type: 'pdf',
          size: '4.2 MB',
          uploadDate: '2024-01-05',
          downloadCount: 22,
          description: 'Professional German language guide for business communications, presentations, and formal correspondence.',
          url: 'https://example.com/german-b1-business.pdf',
          preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop'
        },
        {
          id: 9,
          title: 'German B1 - Final Assessment Guide',
          type: 'docx',
          size: '2.1 MB',
          uploadDate: '2024-01-08',
          downloadCount: 19,
          description: 'Complete preparation guide for B1 level certification exam. Includes sample questions and study strategies.',
          url: 'https://example.com/german-b1-assessment.docx',
          preview: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop'
        }
      ]
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New Material Added',
      message: 'German A1 - Grammar Guide Video has been uploaded.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Material Updated',
      message: 'German A2 - Advanced Grammar Rules has been updated.',
      time: '1 day ago',
      read: false
    }
  ];

  const toggleNotificationPanel = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const openPreviewModal = (material) => {
    setSelectedPreview(material);
    setIsPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setSelectedPreview(null);
  };

  const downloadMaterial = (material) => {
    // In a real app, this would download the file
    console.log('Downloading:', material.title);
    // Simulate download
    const link = document.createElement('a');
    link.href = material.url;
    link.download = material.title;
    link.click();
  };

  // Handle Escape key to close preview modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isPreviewModalOpen) {
        closePreviewModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isPreviewModalOpen]);

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

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return faFilePdf;
      case 'docx':
        return faFileWord;
      case 'video':
        return faFileVideo;
      case 'audio':
        return faFile;
      default:
        return faFileAlt;
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'pdf':
        return 'text-red-500';
      case 'docx':
        return 'text-blue-500';
      case 'video':
        return 'text-purple-500';
      case 'audio':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredMaterials = materials.filter(courseData => {
    if (activeTab === 'All Courses') return true;
    return courseData.courseName === activeTab;
  });

  const courseNames = ['All Courses', ...materials.map(course => course.courseName)];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container with Black Background */}
      <div className="flex-1 bg-black p-4">
        <div className="bg-white rounded-2xl h-full flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-8 relative bg-gray-100">
            <div className="w-full h-full">
              <div className="flex space-x-8 h-full">
                {/* Materials Section - Left Half */}
                <div className="flex-1 h-full min-h-0">
                  <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-8 flex-shrink-0">
                      <h1 className="text-3xl font-bold text-gray-800 mb-6">Course Materials</h1>
                      
                      {/* Tabs */}
                      <div className="flex space-x-8 border-b border-gray-200 overflow-x-auto">
                        {courseNames.map((courseName) => (
                          <button
                            key={courseName}
                            onClick={() => setActiveTab(courseName)}
                            className={`pb-4 px-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                              activeTab === courseName
                                ? 'text-gray-800 border-b-2 border-gray-800'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {courseName}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                      <div className="space-y-6">
                        {filteredMaterials.map((courseData) => (
                          <div key={courseData.id}>
                            {/* Course Header */}
                            <div className="flex items-center space-x-3 mb-4">
                              <img 
                                src={courseData.flag} 
                                alt={`${courseData.courseName} Flag`} 
                                className="w-8 h-6 object-contain drop-shadow-sm"
                              />
                              <h2 className="text-xl font-semibold text-gray-800">{courseData.courseName}</h2>
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {courseData.courseLevel}
                              </span>
                            </div>

                            {/* Materials Grid */}
                            <div className="grid grid-cols-1 gap-4">
                              {courseData.materials.map((material) => (
                                <div 
                                  key={material.id} 
                                  className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 ${
                                    selectedMaterial?.id === material.id 
                                      ? 'border-blue-500 bg-blue-50' 
                                      : 'border-gray-200 bg-white hover:border-gray-300'
                                  }`}
                                  onClick={() => setSelectedMaterial(material)}
                                >
                                  <div className="flex items-start space-x-4">
                                    {/* File Icon */}
                                    <div className="flex-shrink-0">
                                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100">
                                        <FontAwesomeIcon 
                                          icon={getFileIcon(material.type)} 
                                          className={`text-xl ${getFileColor(material.type)}`}
                                        />
                                      </div>
                                    </div>
                                    
                                    {/* Material Details */}
                                    <div className="flex-1 min-w-0">
                                      <h3 className="text-lg font-medium text-gray-800 truncate">{material.title}</h3>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {material.type.toUpperCase()} • {material.size} • {material.downloadCount} downloads
                                      </p>
                                      <p className="text-xs text-gray-500 mt-2">
                                        Uploaded: {new Date(material.uploadDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openPreviewModal(material);
                                        }}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                        title="Preview"
                                      >
                                        <FontAwesomeIcon icon={faEye} className="text-sm" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          downloadMaterial(material);
                                        }}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                        title="Download"
                                      >
                                        <FontAwesomeIcon icon={faDownload} className="text-sm" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Details Section - Right Half */}
                <div className="flex-1 relative h-full min-h-0">
                  {/* Logo positioned at top right */}
                  <div className="absolute top-4 right-8 z-20">
                    <img 
                      src={logoSharp} 
                      alt="Langzy Logo" 
                      className="h-16 w-auto"
                    />
                  </div>
                  
                  {selectedMaterial ? (
                    <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
                      {/* Fixed Header Section */}
                      <div className="flex-shrink-0 mb-6">
                        <div className="flex items-center space-x-3 mb-6">
                          <h2 className="text-xl font-semibold text-gray-800">Material Details</h2>
                          <button 
                            onClick={() => setSelectedMaterial(null)}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                          >
                            <FontAwesomeIcon icon={faTimes} className="text-sm" />
                          </button>
                        </div>
                        
                        {/* Material Preview */}
                        <div>
                          <div 
                            className="relative rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => openPreviewModal(selectedMaterial)}
                          >
                            <img 
                              src={selectedMaterial.preview} 
                              alt={selectedMaterial.title}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-40 transition-all duration-200">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                                <FontAwesomeIcon icon={faEye} className="text-gray-700 text-lg" />
                              </div>
                            </div>
                          </div>
                          <h3 className="text-sm font-medium text-gray-800 mt-2">{selectedMaterial.title}</h3>
                        </div>
                      </div>

                      {/* Scrollable Content Section */}
                      <div className="flex-1 overflow-y-auto">
                        {/* Material Description */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Description</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {selectedMaterial.description}
                          </p>
                        </div>

                        {/* Material Information */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">File Information</h3>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">File Type</span>
                              <div className="flex items-center space-x-2">
                                <FontAwesomeIcon 
                                  icon={getFileIcon(selectedMaterial.type)} 
                                  className={`text-sm ${getFileColor(selectedMaterial.type)}`}
                                />
                                <span className="text-sm font-medium text-gray-800">
                                  {selectedMaterial.type.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">File Size</span>
                              <span className="text-sm font-medium text-gray-800">{selectedMaterial.size}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Upload Date</span>
                              <span className="text-sm font-medium text-gray-800">
                                {new Date(selectedMaterial.uploadDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Downloads</span>
                              <span className="text-sm font-medium text-gray-800">{selectedMaterial.downloadCount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Actions</h3>
                          <div className="flex space-x-4">
                            <button
                              onClick={() => openPreviewModal(selectedMaterial)}
                              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                            >
                              <FontAwesomeIcon icon={faEye} className="text-sm" />
                              <span>Preview</span>
                            </button>
                            <button
                              onClick={() => downloadMaterial(selectedMaterial)}
                              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                              <FontAwesomeIcon icon={faDownload} className="text-sm" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <FontAwesomeIcon icon={faFileAlt} className="text-4xl mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Select a Material</h3>
                        <p className="text-sm">Click on any material to view details</p>
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

        {/* Preview Modal */}
        {isPreviewModalOpen && selectedPreview && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={closePreviewModal}
          >
            <div 
              className="relative w-full max-w-4xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={closePreviewModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
              </button>
              
              {/* Preview Container */}
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                {selectedPreview.type === 'video' ? (
                  <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                    <video 
                      controls 
                      autoPlay
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      poster={selectedPreview.preview}
                    >
                      <source src={selectedPreview.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <FontAwesomeIcon 
                      icon={getFileIcon(selectedPreview.type)} 
                      className={`text-6xl mb-4 ${getFileColor(selectedPreview.type)}`}
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedPreview.title}</h3>
                    <p className="text-gray-600 mb-4">{selectedPreview.description}</p>
                    <p className="text-sm text-gray-500 mb-6">
                      {selectedPreview.type.toUpperCase()} • {selectedPreview.size}
                    </p>
                    <button
                      onClick={() => downloadMaterial(selectedPreview)}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Download File
                    </button>
                  </div>
                )}
                
                {/* File Info */}
                <div className="p-4 bg-gray-50 border-t">
                  <h3 className="text-lg font-semibold mb-1">{selectedPreview.title}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedPreview.type.toUpperCase()} • {selectedPreview.size} • {selectedPreview.downloadCount} downloads
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Material; 