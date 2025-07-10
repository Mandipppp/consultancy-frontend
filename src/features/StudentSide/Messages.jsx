import React, { useState, useRef, useEffect } from 'react';
import logoSharp from '../../../src/assets/images/logo_sharp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faBell, 
  faTimes, 
  faCheck, 
  faExclamationTriangle,
  faUserGraduate,
  faUserTie,
  faHeadset,
  faUsers,
  faCircle,
  faSearch,
  faSmile,
  faPaperclip,
  faCheckDouble,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

const Messages = () => {
  const [activeContact, setActiveContact] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Sample contacts data
  const contacts = [
    // Tutors
    {
      id: 1,
      name: 'Binod Chalise',
      role: 'German Tutor',
      category: 'Tutors',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'Great work on your assignment! Keep practicing the grammar exercises.',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      messages: [
        { id: 1, text: 'Hello! How are you progressing with the German exercises?', sender: 'tutor', timestamp: '10:30 AM', status: 'read' },
        { id: 2, text: 'I\'m doing well, but I have some questions about the grammar.', sender: 'student', timestamp: '10:32 AM', status: 'delivered' },
        { id: 3, text: 'Perfect! What specific grammar topics are you struggling with?', sender: 'tutor', timestamp: '10:35 AM', status: 'read' },
        { id: 4, text: 'The conjugation of irregular verbs is confusing me.', sender: 'student', timestamp: '10:37 AM', status: 'delivered' },
        { id: 5, text: 'Great work on your assignment! Keep practicing the grammar exercises.', sender: 'tutor', timestamp: '2 min ago', status: 'unread' }
      ]
    },
    {
      id: 2,
      name: 'Ganesh Parajuli',
      role: 'German Tutor',
      category: 'Tutors',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '1 hour ago',
      lastMessage: 'See you in tomorrow\'s session!',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      messages: [
        { id: 1, text: 'Hello! Ready for today\'s advanced grammar lesson?', sender: 'tutor', timestamp: '9:00 AM', status: 'read' },
        { id: 2, text: 'Yes, I\'m excited to learn more about subjunctive mood.', sender: 'student', timestamp: '9:02 AM', status: 'delivered' },
        { id: 3, text: 'See you in tomorrow\'s session!', sender: 'tutor', timestamp: '1 hour ago', status: 'read' }
      ]
    },
    // Counselors
    {
      id: 3,
      name: 'Dr. Sarah Wilson',
      role: 'Academic Counselor',
      category: 'Counselors',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c4e20c1e?w=96&h=96&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'I\'ve scheduled your consultation for next week.',
      lastMessageTime: '30 min ago',
      unreadCount: 1,
      messages: [
        { id: 1, text: 'How are you feeling about your language learning progress?', sender: 'counselor', timestamp: '2:00 PM', status: 'read' },
        { id: 2, text: 'I feel good but sometimes overwhelmed with the pace.', sender: 'student', timestamp: '2:05 PM', status: 'delivered' },
        { id: 3, text: 'I\'ve scheduled your consultation for next week.', sender: 'counselor', timestamp: '30 min ago', status: 'unread' }
      ]
    },
    // Langzy Support
    {
      id: 4,
      name: 'Langzy Support',
      role: 'Customer Support',
      category: 'Support',
      avatar: logoSharp,
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'Your technical issue has been resolved. Let us know if you need further assistance.',
      lastMessageTime: '2 hours ago',
      unreadCount: 0,
      messages: [
        { id: 1, text: 'Hello! How can we help you today?', sender: 'support', timestamp: '11:00 AM', status: 'read' },
        { id: 2, text: 'I\'m having trouble accessing my course materials.', sender: 'student', timestamp: '11:02 AM', status: 'delivered' },
        { id: 3, text: 'I\'ll look into this right away. Can you tell me which course?', sender: 'support', timestamp: '11:05 AM', status: 'read' },
        { id: 4, text: 'German A1 course materials are not loading.', sender: 'student', timestamp: '11:07 AM', status: 'delivered' },
        { id: 5, text: 'Your technical issue has been resolved. Let us know if you need further assistance.', sender: 'support', timestamp: '2 hours ago', status: 'read' }
      ]
    },
    // Fellow Students
    {
      id: 5,
      name: 'Priya Sharma',
      role: 'Fellow Student',
      category: 'Students',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '3 hours ago',
      lastMessage: 'Thanks for sharing those study notes!',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      messages: [
        { id: 1, text: 'Hey! Are you also taking the German A1 course?', sender: 'student', timestamp: '1:00 PM', status: 'read' },
        { id: 2, text: 'Yes! How are you finding it?', sender: 'student', timestamp: '1:02 PM', status: 'delivered' },
        { id: 3, text: 'It\'s challenging but fun. Want to study together?', sender: 'student', timestamp: '1:05 PM', status: 'read' },
        { id: 4, text: 'That sounds great! I\'ll share my notes with you.', sender: 'student', timestamp: '1:07 PM', status: 'delivered' },
        { id: 5, text: 'Thanks for sharing those study notes!', sender: 'student', timestamp: '3 hours ago', status: 'read' }
      ]
    },
    {
      id: 6,
      name: 'Amit Kumar',
      role: 'Fellow Student',
      category: 'Students',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
      isOnline: true,
      lastSeen: 'Online',
      lastMessage: 'Good luck with your exam tomorrow!',
      lastMessageTime: '5 min ago',
      unreadCount: 1,
      messages: [
        { id: 1, text: 'How\'s your German pronunciation practice going?', sender: 'student', timestamp: '4:00 PM', status: 'read' },
        { id: 2, text: 'Still working on the "ü" sound. It\'s tricky!', sender: 'student', timestamp: '4:02 PM', status: 'delivered' },
        { id: 3, text: 'Good luck with your exam tomorrow!', sender: 'student', timestamp: '5 min ago', status: 'unread' }
      ]
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'New Message',
      message: 'You have a new message from Binod Chalise',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Message Delivered',
      message: 'Your message to Dr. Sarah Wilson has been delivered',
      time: '1 hour ago',
      read: true
    }
  ];

  const categories = [
    { key: 'All', label: 'All Messages', icon: faUsers },
    { key: 'Tutors', label: 'Tutors', icon: faUserGraduate },
    { key: 'Counselors', label: 'Counselors', icon: faUserTie },
    { key: 'Support', label: 'Langzy Support', icon: faHeadset },
    { key: 'Students', label: 'Fellow Students', icon: faUsers }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesCategory = activeCategory === 'All' || contact.category === activeCategory;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && activeContact) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        sender: 'student',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered'
      };
      
      // Update the active contact's messages
      const updatedContact = {
        ...activeContact,
        messages: [...activeContact.messages, newMessage],
        lastMessage: messageText,
        lastMessageTime: 'Just now'
      };
      
      setActiveContact(updatedContact);
      setMessageText('');
      
      // Auto-scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return faCheck;
      case 'read':
        return faCheckDouble;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Tutors':
        return faUserGraduate;
      case 'Counselors':
        return faUserTie;
      case 'Support':
        return faHeadset;
      case 'Students':
        return faUsers;
      default:
        return faUsers;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Tutors':
        return 'text-blue-600';
      case 'Counselors':
        return 'text-green-600';
      case 'Support':
        return 'text-purple-600';
      case 'Students':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeContact?.messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container with Black Background */}
      <div className="flex-1 bg-black p-4">
        <div className="bg-white rounded-2xl h-full flex overflow-hidden">
          {/* Contacts Section - Left Side */}
          <div className="w-80 bg-white flex flex-col border-r border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Messages</h1>
              
              {/* Search Bar */}
              <div className="relative mb-4">
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                      activeCategory === category.key
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={category.icon} className="mr-1" />
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setActiveContact(contact)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 ${
                    activeContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {contact.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-800 truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <FontAwesomeIcon 
                          icon={getCategoryIcon(contact.category)} 
                          className={`text-xs ${getCategoryColor(contact.category)}`}
                        />
                        <span className="text-xs text-gray-500">{contact.role}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate flex-1">{contact.lastMessage}</p>
                        {contact.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ml-2">
                            {contact.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Section - Right Side */}
          <div className="flex-1 flex flex-col relative bg-gray-100">
            {/* Logo positioned at top right */}
            <div className="absolute top-4 right-8 z-10">
              <img 
                src={logoSharp} 
                alt="Langzy Logo" 
                className="h-16 w-auto"
              />
            </div>

            {activeContact ? (
              <>
                {/* Chat Header */}
                <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={activeContact.avatar}
                        alt={activeContact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {activeContact.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800">{activeContact.name}</h2>
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon 
                          icon={getCategoryIcon(activeContact.category)} 
                          className={`text-xs ${getCategoryColor(activeContact.category)}`}
                        />
                        <span className="text-sm text-gray-500">{activeContact.role}</span>
                        <FontAwesomeIcon icon={faCircle} className="text-xs text-gray-300" />
                        <span className="text-sm text-gray-500">{activeContact.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeContact.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === 'student'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center justify-end space-x-1 mt-1 ${
                          message.sender === 'student' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          <span className="text-xs">{message.timestamp}</span>
                          {message.sender === 'student' && getMessageStatusIcon(message.status) && (
                            <FontAwesomeIcon 
                              icon={getMessageStatusIcon(message.status)} 
                              className="text-xs"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="bg-white p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faPaperclip} />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faSmile} />
                    </button>
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <FontAwesomeIcon icon={faUsers} className="text-6xl mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">Select a conversation</h3>
                  <p className="text-sm">Choose a contact to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Floating Notification Button - Bottom Right */}

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

export default Messages; 