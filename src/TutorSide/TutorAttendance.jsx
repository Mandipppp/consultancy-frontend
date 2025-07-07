import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDays, 
  faUsers, 
  faCheck, 
  faTimes, 
  faClock, 
  faExclamationTriangle,
  faSave,
  faChevronDown,
  faUserCheck,
  faUserTimes,
  faUserClock,
  faUserShield,
  faBell,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

const TutorAttendance = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data - replace with API calls
  const todaysClasses = [
    {
      id: 1,
      name: 'German A1 - Grammar Basics',
      time: '09:00 - 10:30',
      level: 'A1',
      language: 'German',
      studentCount: 12,
      flag: 'https://flagcdn.com/w40/de.png',
      room: 'Online - Zoom',
      status: 'scheduled' // scheduled, ongoing, completed
    },
    {
      id: 2,
      name: 'German A2 - Conversation Practice',
      time: '14:00 - 15:30',
      level: 'A2',
      language: 'German',
      studentCount: 8,
      flag: 'https://flagcdn.com/w40/de.png',
      room: 'Online - Zoom',
      status: 'scheduled'
    },
    {
      id: 3,
      name: 'German B1 - Business German',
      time: '15:00 - 16:30',
      level: 'B1',
      language: 'German',
      studentCount: 6,
      flag: 'https://flagcdn.com/w40/de.png',
      room: 'Online - Zoom',
      status: 'completed'
    }
  ];

  const studentsData = {
    1: [ // German A1 class
      {
        id: 1,
        name: 'Ashok Dhungana',
        email: 'ashok@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
        previousAttendance: 'present',
        attendanceRate: 95
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5aa?w=64&h=64&fit=crop&crop=face',
        previousAttendance: 'present',
        attendanceRate: 88
      },
      {
        id: 3,
        name: 'Raj Patel',
        email: 'raj@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
        previousAttendance: 'late',
        attendanceRate: 92
      },
      {
        id: 4,
        name: 'Anita Thapa',
        email: 'anita@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
        previousAttendance: 'absent',
        attendanceRate: 76
      },
      {
        id: 5,
        name: 'Suresh Maharjan',
        email: 'suresh@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face',
        previousAttendance: 'present',
        attendanceRate: 100
      }
    ],
    2: [ // German A2 class
      {
        id: 6,
        name: 'Maya Gurung',
        email: 'maya@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face',
        previousAttendance: 'present',
        attendanceRate: 94
      },
      {
        id: 7,
        name: 'Kiran Shrestha',
        email: 'kiran@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
        previousAttendance: 'present',
        attendanceRate: 89
      }
    ]
  };

  const getStudents = (classId) => {
    return studentsData[classId] || [];
  };

  const filteredStudents = selectedClass 
    ? getStudents(selectedClass.id).filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const markAttendance = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        status,
        timestamp: new Date().toISOString(),
        notes: ''
      }
    }));
  };

  const getAttendanceStatus = (studentId) => {
    return attendanceData[studentId]?.status || null;
  };

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'present':
        return faUserCheck;
      case 'absent':
        return faUserTimes;
      case 'late':
        return faUserClock;
      case 'excused':
        return faUserShield;
      default:
        return faUsers;
    }
  };

  const getAttendanceColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-500 text-white';
      case 'absent':
        return 'bg-red-500 text-white';
      case 'late':
        return 'bg-yellow-500 text-white';
      case 'excused':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getAttendanceStats = () => {
    const totalStudents = filteredStudents.length;
    const markedStudents = Object.keys(attendanceData).length;
    const presentStudents = Object.values(attendanceData).filter(record => record.status === 'present').length;
    const absentStudents = Object.values(attendanceData).filter(record => record.status === 'absent').length;
    const lateStudents = Object.values(attendanceData).filter(record => record.status === 'late').length;
    const excusedStudents = Object.values(attendanceData).filter(record => record.status === 'excused').length;

    return {
      totalStudents,
      markedStudents,
      presentStudents,
      absentStudents,
      lateStudents,
      excusedStudents,
      unmarkedStudents: totalStudents - markedStudents
    };
  };

  const saveAttendance = async () => {
    setIsSaving(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1000);
  };

  const stats = getAttendanceStats();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance Management</h1>
              <p className="text-gray-600">Mark attendance for your classes</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Today</div>
                <div className="text-lg font-semibold text-gray-800">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Class Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Classes</h2>
              <div className="space-y-3">
                {todaysClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedClass?.id === classItem.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedClass(classItem)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <img 
                        src={classItem.flag} 
                        alt="Flag" 
                        className="w-6 h-4 object-contain"
                      />
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {classItem.level}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        classItem.status === 'completed' ? 'bg-green-100 text-green-700' :
                        classItem.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {classItem.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">{classItem.name}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faClock} />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faUsers} />
                        <span>{classItem.studentCount} students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Attendance Marking */}
          <div className="lg:col-span-2">
            {selectedClass ? (
              <div className="space-y-6">
                {/* Class Info & Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={selectedClass.flag} 
                        alt="Flag" 
                        className="w-8 h-6 object-contain"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{selectedClass.name}</h2>
                        <p className="text-gray-600 text-sm">{selectedClass.time} • {selectedClass.room}</p>
                      </div>
                    </div>
                    <button
                      onClick={saveAttendance}
                      disabled={isSaving || Object.keys(attendanceData).length === 0}
                      className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 ${
                        isSaving || Object.keys(attendanceData).length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <FontAwesomeIcon icon={faSave} className="text-sm" />
                      <span>{isSaving ? 'Saving...' : 'Save Attendance'}</span>
                    </button>
                  </div>

                  {/* Attendance Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{stats.totalStudents}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{stats.presentStudents}</div>
                      <div className="text-sm text-gray-600">Present</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{stats.absentStudents}</div>
                      <div className="text-sm text-gray-600">Absent</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{stats.lateStudents}</div>
                      <div className="text-sm text-gray-600">Late</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stats.excusedStudents}</div>
                      <div className="text-sm text-gray-600">Excused</div>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative mb-6">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Students List */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Students</h3>
                  <div className="space-y-3">
                    {filteredStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={student.avatar} 
                            alt={student.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">Previous: </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                student.previousAttendance === 'present' ? 'bg-green-100 text-green-700' :
                                student.previousAttendance === 'late' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {student.previousAttendance}
                              </span>
                              <span className="text-xs text-gray-500">({student.attendanceRate}% rate)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {['present', 'late', 'absent', 'excused'].map((status) => (
                            <button
                              key={status}
                              onClick={() => markAttendance(student.id, status)}
                              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-1 ${
                                getAttendanceStatus(student.id) === status
                                  ? getAttendanceColor(status)
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              <FontAwesomeIcon icon={getAttendanceIcon(status)} className="text-xs" />
                              <span className="capitalize">{status}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
                <FontAwesomeIcon icon={faCalendarDays} className="text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">Select a Class</h3>
                <p className="text-gray-500">Choose a class from the left panel to mark attendance</p>
              </div>
            )}
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <FontAwesomeIcon icon={faCheck} />
            <span>Attendance saved successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorAttendance; 