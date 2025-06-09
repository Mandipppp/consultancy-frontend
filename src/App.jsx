import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

// Auth
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';

// Dashboards
import AdminDashboard from './features/admin/AdminDashboard';
import OwnerDashboard from './features/owner/pages/OwnerDashboard';
import TutorDashboard from './features/tutor/pages/TutorDashboard';
import UserDashboard from './features/user/pages/UserDashboard';
import VideoCalling from './test/VideoCalling';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
        <Route path="/student/dashboard" element={<UserDashboard />} />

        {/* video calling */}
                <Route path="/call" element={<VideoCalling />} />
      </Routes>
    </Router>
  );
}

export default App;
