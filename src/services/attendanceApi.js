import axios from './axios';

const attendanceApi = {
  // Mark individual student attendance
  markAttendance: async (attendanceData) => {
    try {
      const response = await axios.post('/attendance/mark', attendanceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Bulk mark attendance for multiple students (for TutorAttendance save function)
  bulkMarkAttendance: async (bulkData) => {
    try {
      const response = await axios.post('/attendance/bulk', bulkData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get today's classes for a tutor (for TutorAttendance class selection)
  getTutorTodaysClasses: async (tutorId, date = null) => {
    try {
      const params = date ? { date } : {};
      const response = await axios.get(`/attendance/tutor/${tutorId}/classes`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get students for a class (for TutorAttendance student list)
  getClassStudents: async (classId) => {
    try {
      const response = await axios.get(`/attendance/class/${classId}/students`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get class attendance for a specific date
  getClassAttendance: async (classId, date) => {
    try {
      const response = await axios.get(`/attendance/class/${classId}`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get student attendance statistics (for Info.jsx charts)
  getStudentAttendanceStats: async (studentId, classId = null, startDate = null, endDate = null) => {
    try {
      const params = {};
      if (classId) params.classId = classId;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get(`/attendance/student/${studentId}/stats`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get student attendance history (for Info.jsx recent attendance)
  getStudentAttendanceHistory: async (studentId, options = {}) => {
    try {
      const { page = 1, limit = 10, classId, startDate, endDate } = options;
      const params = { page, limit };
      if (classId) params.classId = classId;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get(`/attendance/student/${studentId}/history`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get tutor attendance summary
  getTutorAttendanceSummary: async (tutorId, startDate = null, endDate = null) => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get(`/attendance/tutor/${tutorId}/summary`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update attendance record
  updateAttendance: async (attendanceId, updateData) => {
    try {
      const response = await axios.put(`/attendance/${attendanceId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete attendance record
  deleteAttendance: async (attendanceId) => {
    try {
      const response = await axios.delete(`/attendance/${attendanceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default attendanceApi; 