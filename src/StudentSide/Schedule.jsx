import React, { useState, useEffect } from 'react';
import logoSharp from '../assets/images/logo_sharp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faBook, faFileAlt, faDownload, faBell, faTimes, faCheck, faExclamationTriangle, faPlay, faStar, faCheckCircle, faClock, faGraduationCap, faChevronLeft, faChevronRight, faVideo, faUsers, faMapPin } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('week'); // 'week' or 'month'
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample schedule data - in real app, this would come from API
  const scheduleData = [
    // Historical Classes (Past)
    {
      id: 1,
      title: 'German A1 - Introduction to German',
      courseId: 1,
      courseName: 'German A1',
      type: 'class',
      date: '2024-01-08',
      startTime: '09:00',
      endTime: '10:30',
      tutor: 'Binod Chalise',
      location: 'Online - Zoom',
      description: 'First class introduction to German language, alphabet, and basic pronunciation.',
      attendees: 15,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/1234567890'
    },
    {
      id: 2,
      title: 'German A1 - Numbers and Time',
      courseId: 1,
      courseName: 'German A1',
      type: 'class',
      date: '2024-01-10',
      startTime: '09:00',
      endTime: '10:30',
      tutor: 'Binod Chalise',
      location: 'Online - Zoom',
      description: 'Learning German numbers, time expressions, and basic counting.',
      attendees: 15,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/1234567890'
    },
    {
      id: 3,
      title: 'German A1 - Family Vocabulary Quiz',
      courseId: 1,
      courseName: 'German A1',
      type: 'quiz',
      date: '2024-01-12',
      startTime: '13:00',
      endTime: '14:00',
      tutor: 'Binod Chalise',
      location: 'Online - Platform',
      description: 'Quiz on family members, relationships, and personal information vocabulary.',
      attendees: 15,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://platform.langzy.com/quiz/101'
    },
    {
      id: 4,
      title: 'German A2 - Past Tense Introduction',
      courseId: 2,
      courseName: 'German A2',
      type: 'class',
      date: '2024-01-14',
      startTime: '14:00',
      endTime: '15:30',
      tutor: 'Ganesh Parajuli',
      location: 'Online - Zoom',
      description: 'Introduction to German past tense forms and storytelling techniques.',
      attendees: 10,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/0987654321'
    },
    {
      id: 5,
      title: 'German B1 - Presentation Skills',
      courseId: 3,
      courseName: 'German B1',
      type: 'workshop',
      date: '2024-01-16',
      startTime: '15:00',
      endTime: '16:30',
      tutor: 'Binod Chalise',
      location: 'Online - Zoom',
      description: 'Workshop on professional presentation skills in German language.',
      attendees: 8,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/2222222222'
    },
    {
      id: 6,
      title: 'German A1 - Daily Routines',
      courseId: 1,
      courseName: 'German A1',
      type: 'class',
      date: '2024-01-17',
      startTime: '09:00',
      endTime: '10:30',
      tutor: 'Binod Chalise',
      location: 'Online - Zoom',
      description: 'Learning vocabulary and expressions for daily activities and routines.',
      attendees: 14,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/1234567890'
    },
    {
      id: 7,
      title: 'German A2 - Travel Vocabulary',
      courseId: 2,
      courseName: 'German A2',
      type: 'class',
      date: '2024-01-19',
      startTime: '14:00',
      endTime: '15:30',
      tutor: 'Ganesh Parajuli',
      location: 'Online - Zoom',
      description: 'Travel-related vocabulary, asking for directions, and transportation terms.',
      attendees: 10,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/0987654321'
    },

    // Recent Classes
    {
      id: 8,
      title: 'German A1 - Grammar Basics',
      courseId: 1,
      courseName: 'German A1',
      type: 'class',
      date: '2024-01-22',
      startTime: '09:00',
      endTime: '10:30',
      tutor: 'Binod Chalise',
      location: 'Online - Zoom',
      description: 'Introduction to German grammar fundamentals including sentence structure and basic tenses.',
      attendees: 12,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/1234567890'
    },
    {
      id: 9,
      title: 'German A2 - Conversation Practice',
      courseId: 2,
      courseName: 'German A2',
      type: 'class',
      date: '2024-01-22',
      startTime: '14:00',
      endTime: '15:30',
      tutor: 'Ganesh Parajuli',
      location: 'Online - Zoom',
      description: 'Interactive conversation practice focusing on everyday scenarios and vocabulary expansion.',
      attendees: 8,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/0987654321'
    },
    {
      id: 10,
      title: 'German B1 - Business German',
      courseId: 3,
      courseName: 'German B1',
      type: 'class',
      date: '2024-01-23',
      startTime: '15:00',
      endTime: '16:30',
      tutor: 'Binod Chalise',
      location: 'Online - Zoom',
      description: 'Professional German language skills for business communications and presentations.',
      attendees: 6,
      status: 'completed',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/2222222222'
    },

    // Today's Classes
    {
      id: 11,
      title: 'German A1 - Speaking Assessment',
      courseId: 1,
      courseName: 'German A1',
      type: 'assessment',
      date: new Date().toISOString().split('T')[0], // Today
      startTime: '10:00',
      endTime: '11:00',
      tutor: 'Binod Chalise',
      location: 'Online - Individual',
      description: 'One-on-one speaking assessment to evaluate pronunciation and basic conversation skills.',
      attendees: 1,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/1111111111'
    },
    {
      id: 12,
      title: 'German A2 - Cultural Discussion',
      courseId: 2,
      courseName: 'German A2',
      type: 'class',
      date: new Date().toISOString().split('T')[0], // Today
      startTime: '16:00',
      endTime: '17:30',
      tutor: 'Ganesh Parajuli',
      location: 'Online - Zoom',
      description: 'Discussion about German culture, traditions, and social customs.',
      attendees: 9,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/5555555555'
    },

    // Future Scheduled Classes
    {
      id: 13,
      title: 'German A2 - Cultural Workshop',
      courseId: 2,
      courseName: 'German A2',
      type: 'workshop',
      date: '2025-01-24',
      startTime: '11:00',
      endTime: '12:30',
      tutor: 'Ganesh Parajuli',
      location: 'Online - Zoom',
      description: 'Explore German culture, traditions, and customs to enhance language learning experience.',
      attendees: 15,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/3333333333'
    },
    {
      id: 14,
      title: 'German A1 - Vocabulary Quiz',
      courseId: 1,
      courseName: 'German A1',
      type: 'quiz',
      date: '2025-01-25',
      startTime: '13:00',
      endTime: '14:00',
      tutor: 'Binod Chalise',
      location: 'Online - Platform',
      description: 'Weekly vocabulary quiz covering chapters 1-3 with immediate feedback.',
      attendees: 12,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://platform.langzy.com/quiz/123'
    },
    {
      id: 15,
      title: 'German A2 - Group Project',
      courseId: 2,
      courseName: 'German A2',
      type: 'project',
      date: '2025-01-26',
      startTime: '16:00',
      endTime: '17:30',
      tutor: 'Ganesh Parajuli',
      location: 'Online - Zoom',
      description: 'Collaborative project presentation on German-speaking countries and their cultures.',
      attendees: 8,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/4444444444'
    },
    {
      id: 16,
      title: 'German A1 - Food and Dining',
      courseId: 1,
      courseName: 'German A1',
      type: 'class',
      date: '2025-01-27',
      startTime: '09:00',
      endTime: '10:30',
      tutor: 'Binod Chalise',
      location: 'Online - Zoom',
      description: 'Learning vocabulary related to food, restaurants, and dining experiences in Germany.',
      attendees: 13,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/1234567890'
    },
    {
      id: 17,
      title: 'German B1 - Advanced Grammar',
      courseId: 3,
      courseName: 'German B1',
      type: 'class',
      date: '2025-01-28',
      startTime: '15:00',
      endTime: '16:30',
      tutor: 'Binod Chalise',
      location: 'Online - Zoom',
      description: 'Advanced German grammar concepts including complex sentence structures.',
      attendees: 7,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/2222222222'
    },
    {
      id: 18,
      title: 'German A2 - Shopping and Services',
      courseId: 2,
      courseName: 'German A2',
      type: 'class',
      date: '2025-01-29',
      startTime: '14:00',
      endTime: '15:30',
      tutor: 'Ganesh Parajuli',
      location: 'Online - Zoom',
      description: 'Vocabulary and phrases for shopping, services, and customer interactions.',
      attendees: 11,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://zoom.us/j/0987654321'
    },
    {
      id: 19,
      title: 'German A1 - Final Assessment',
      courseId: 1,
      courseName: 'German A1',
      type: 'assessment',
      date: '2025-01-30',
      startTime: '10:00',
      endTime: '11:30',
      tutor: 'Binod Chalise',
      location: 'Online - Platform',
      description: 'Comprehensive final assessment covering all A1 level topics and skills.',
      attendees: 12,
      status: 'scheduled',
      flag: 'https://flagcdn.com/w40/de.png',
      meetingLink: 'https://platform.langzy.com/assessment/final-a1'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Class Reminder',
      message: 'German A1 - Grammar Basics starts in 30 minutes.',
      time: '30 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Schedule Updated',
      message: 'New workshop added: German A2 - Cultural Workshop.',
      time: '2 hours ago',
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

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'class':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assessment':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'workshop':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'quiz':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'project':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'class':
        return faBook;
      case 'assessment':
        return faCheckCircle;
      case 'workshop':
        return faUsers;
      case 'quiz':
        return faFileAlt;
      case 'project':
        return faGraduationCap;
      default:
        return faCalendarDays;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'scheduled':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const isEventInPast = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    return event < today;
  };

  const isEventToday = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    return today.toDateString() === event.toDateString();
  };

  const getEventOpacity = (event) => {
    if (isEventInPast(event.date) && event.status === 'completed') {
      return 'opacity-75';
    }
    if (isEventToday(event.date)) {
      return 'ring-2 ring-blue-400';
    }
    return '';
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (selectedView === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Start from Monday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return scheduleData.filter(event => event.date === dateStr);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const joinMeeting = (event) => {
    window.open(event.meetingLink, '_blank');
  };

  const weekDates = getWeekDates();
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
                {/* Schedule Section - Left Half */}
                <div className="flex-1 h-full min-h-0">
                  <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-8 flex-shrink-0">
                      <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Schedule</h1>
                        <div className="flex items-center space-x-4">
                          {/* View Toggle */}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedView('week')}
                              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                selectedView === 'week'
                                  ? 'bg-gray-800 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              Week
                            </button>
                            <button
                              onClick={() => setSelectedView('month')}
                              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                selectedView === 'month'
                                  ? 'bg-gray-800 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              Month
                            </button>
                          </div>
                          
                          {/* Navigation */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => navigateDate('prev')}
                              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                              <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span className="text-lg font-semibold text-gray-800 min-w-[200px] text-center">
                              {currentDate.toLocaleDateString('en-US', { 
                                month: 'long', 
                                year: 'numeric',
                                ...(selectedView === 'week' && { day: 'numeric' })
                              })}
                            </span>
                            <button
                              onClick={() => navigateDate('next')}
                              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                              <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Calendar Content */}
                    <div className="flex-1 overflow-y-auto">
                      {selectedView === 'week' ? (
                        /* Week View */
                        <div className="grid grid-cols-7 gap-3 h-full">
                          {weekDates.map((date, index) => (
                            <div key={index} className="flex flex-col">
                              {/* Day Header */}
                              <div className="text-center mb-4 pb-3 border-b-2 border-gray-200">
                                <div className="text-sm font-semibold text-gray-700">{dayNames[index]}</div>
                                <div className={`text-xl font-bold mt-1 ${
                                  date.toDateString() === new Date().toDateString()
                                    ? 'text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto'
                                    : 'text-gray-800'
                                }`}>
                                  {date.getDate()}
                                </div>
                              </div>
                              
                              {/* Events for this day */}
                              <div className="flex-1 space-y-2 overflow-y-auto">
                                {getEventsForDate(date).map((event) => (
                                  <div
                                    key={event.id}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                                      selectedEvent?.id === event.id
                                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                                        : getEventTypeColor(event.type)
                                    } ${getEventOpacity(event)}`}
                                    onClick={() => setSelectedEvent(event)}
                                  >
                                    {/* Compact Header */}
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center space-x-1">
                                        <FontAwesomeIcon 
                                          icon={getEventTypeIcon(event.type)} 
                                          className="text-xs" 
                                        />
                                        <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status)}`}></div>
                                      </div>
                                      <img 
                                        src={event.flag} 
                                        alt="Course Flag" 
                                        className="w-4 h-3 object-contain"
                                      />
                                    </div>
                                    
                                    {/* Event Title - Compact */}
                                    <h4 className={`font-medium text-sm mb-2 leading-tight ${
                                      isEventInPast(event.date) ? 'text-gray-600' : 'text-gray-800'
                                    }`} style={{
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      wordBreak: 'break-word'
                                    }}>
                                      {event.title}
                                    </h4>
                                    
                                    {/* Time - Single Line */}
                                    <p className="text-xs text-gray-600 mb-1 font-medium">
                                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                    </p>
                                    
                                    {/* Tutor - Single Line */}
                                    <p className="text-xs text-gray-500 mb-2" style={{
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}>
                                      {event.tutor}
                                    </p>
                                    
                                    {/* Compact Status */}
                                    <div className="flex items-center justify-between gap-2">
                                      <span className={`px-2 py-1 text-xs font-medium rounded flex-shrink-0 ${getEventTypeColor(event.type)}`}>
                                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                      </span>
                                      
                                      {/* Status Indicator */}
                                      {isEventToday(event.date) && (
                                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded font-bold flex-shrink-0">
                                          TODAY
                                        </span>
                                      )}
                                      {isEventInPast(event.date) && event.status === 'completed' && (
                                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded font-bold flex-shrink-0">
                                          DONE
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                
                                {/* Empty state for days with no events */}
                                {getEventsForDate(date).length === 0 && (
                                  <div className="flex items-center justify-center h-20 text-gray-400 text-sm">
                                    No events
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Month View - Enhanced */
                        <div className="space-y-4">
                          {scheduleData
                            .filter(event => {
                              const eventDate = new Date(event.date);
                              return eventDate.getMonth() === currentDate.getMonth() && 
                                     eventDate.getFullYear() === currentDate.getFullYear();
                            })
                            .sort((a, b) => new Date(a.date + 'T' + a.startTime) - new Date(b.date + 'T' + b.startTime))
                            .map((event) => (
                              <div
                                key={event.id}
                                className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                                  selectedEvent?.id === event.id
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : getEventTypeColor(event.type)
                                } ${getEventOpacity(event)}`}
                                onClick={() => setSelectedEvent(event)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    {/* Event Header */}
                                    <div className="flex items-center space-x-3 mb-3">
                                      <FontAwesomeIcon 
                                        icon={getEventTypeIcon(event.type)} 
                                        className="text-lg" 
                                      />
                                      <div className={`w-4 h-4 rounded-full ${getStatusColor(event.status)}`}></div>
                                      <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                        {new Date(event.date).toLocaleDateString('en-US', { 
                                          weekday: 'short',
                                          month: 'short', 
                                          day: 'numeric' 
                                        })}
                                      </span>
                                      <img 
                                        src={event.flag} 
                                        alt="Course Flag" 
                                        className="w-6 h-5 object-contain"
                                      />
                                    </div>
                                    
                                    {/* Event Title */}
                                    <h4 className={`font-bold text-lg mb-3 ${
                                      isEventInPast(event.date) ? 'text-gray-600' : 'text-gray-800'
                                    }`}>
                                      {event.title}
                                    </h4>
                                    
                                    {/* Event Details */}
                                    <div className="space-y-2 mb-3">
                                      {/* Time */}
                                      <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faClock} className="text-gray-400 text-sm" />
                                        <p className="text-sm font-semibold text-gray-700">
                                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                        </p>
                                      </div>
                                      
                                      {/* Tutor */}
                                      <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faUsers} className="text-gray-400 text-sm" />
                                        <p className="text-sm text-gray-600 font-medium">{event.tutor}</p>
                                      </div>
                                      
                                      {/* Location */}
                                      <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faMapPin} className="text-gray-400 text-sm" />
                                        <p className="text-sm text-gray-500">{event.location}</p>
                                      </div>
                                    </div>
                                    
                                    {/* Status Badges */}
                                    <div className="flex flex-wrap gap-2">
                                      {isEventToday(event.date) && (
                                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                                          TODAY
                                        </span>
                                      )}
                                      {isEventInPast(event.date) && event.status === 'completed' && (
                                        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                                          COMPLETED
                                        </span>
                                      )}
                                      {event.status === 'scheduled' && !isEventInPast(event.date) && (
                                        <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
                                          SCHEDULED
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Event Type Badge */}
                                  <div className="text-right">
                                    <span className={`px-3 py-2 text-sm font-bold rounded-full ${getEventTypeColor(event.type)}`}>
                                      {event.type.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          
                          {/* Empty state for months with no events */}
                          {scheduleData.filter(event => {
                            const eventDate = new Date(event.date);
                            return eventDate.getMonth() === currentDate.getMonth() && 
                                   eventDate.getFullYear() === currentDate.getFullYear();
                          }).length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                              <FontAwesomeIcon icon={faCalendarDays} className="text-6xl mb-4" />
                              <h3 className="text-xl font-medium text-gray-600 mb-2">No Events This Month</h3>
                              <p className="text-sm">There are no scheduled events for this month.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Event Details Section - Right Half */}
                <div className="flex-1 relative h-full min-h-0">
                  {/* Logo positioned at top right */}
                  <div className="absolute top-4 right-8 z-20">
                    <img 
                      src={logoSharp} 
                      alt="Langzy Logo" 
                      className="h-16 w-auto"
                    />
                  </div>
                  
                  {selectedEvent ? (
                    <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
                      {/* Fixed Header Section */}
                      <div className="flex-shrink-0 mb-6">
                        <div className="flex items-center space-x-3 mb-6">
                          <h2 className="text-xl font-semibold text-gray-800">Event Details</h2>
                          <button 
                            onClick={() => setSelectedEvent(null)}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                          >
                            <FontAwesomeIcon icon={faTimes} className="text-sm" />
                          </button>
                        </div>
                        
                        {/* Event Header */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <FontAwesomeIcon 
                                icon={getEventTypeIcon(selectedEvent.type)} 
                                className="text-gray-600" 
                              />
                              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getEventTypeColor(selectedEvent.type)}`}>
                                {selectedEvent.type}
                              </span>
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedEvent.status)}`}></div>
                            </div>
                            <img 
                              src={selectedEvent.flag} 
                              alt="Course Flag" 
                              className="w-8 h-6 object-contain"
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedEvent.title}</h3>
                          <p className="text-sm text-gray-600">{selectedEvent.courseName}</p>
                        </div>
                      </div>

                      {/* Scrollable Content Section */}
                      <div className="flex-1 overflow-y-auto">
                        {/* Event Description */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Description</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {selectedEvent.description}
                          </p>
                        </div>

                        {/* Event Information */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Event Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400 w-5" />
                              <div>
                                <span className="text-sm text-gray-600">Date</span>
                                <p className="font-medium text-gray-800">
                                  {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <FontAwesomeIcon icon={faClock} className="text-gray-400 w-5" />
                              <div>
                                <span className="text-sm text-gray-600">Time</span>
                                <p className="font-medium text-gray-800">
                                  {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <FontAwesomeIcon icon={faMapPin} className="text-gray-400 w-5" />
                              <div>
                                <span className="text-sm text-gray-600">Location</span>
                                <p className="font-medium text-gray-800">{selectedEvent.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <FontAwesomeIcon icon={faUsers} className="text-gray-400 w-5" />
                              <div>
                                <span className="text-sm text-gray-600">Attendees</span>
                                <p className="font-medium text-gray-800">{selectedEvent.attendees} students</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tutor Information */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Tutor</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faUsers} className="text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">{selectedEvent.tutor}</h4>
                                <p className="text-sm text-gray-600">{selectedEvent.courseName} Instructor</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Actions</h3>
                          <div className="flex space-x-4">
                            {selectedEvent.status === 'scheduled' && (
                              <button
                                onClick={() => joinMeeting(selectedEvent)}
                                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                              >
                                <FontAwesomeIcon icon={faVideo} className="text-sm" />
                                <span>Join Meeting</span>
                              </button>
                            )}
                            <button
                              onClick={() => {
                                const event = new Date(selectedEvent.date + 'T' + selectedEvent.startTime);
                                const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedEvent.title)}&dates=${event.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(selectedEvent.description)}`;
                                window.open(calendarUrl, '_blank');
                              }}
                              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                              <FontAwesomeIcon icon={faCalendarDays} className="text-sm" />
                              <span>Add to Calendar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <FontAwesomeIcon icon={faCalendarDays} className="text-4xl mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Select an Event</h3>
                        <p className="text-sm">Click on any event to view details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Notification Button - Bottom Right */}
        <div className="fixed bottom-8 right-8 z-50">
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

export default Schedule; 