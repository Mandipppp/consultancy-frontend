import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoCalling from './test/VideoCalling';
import TranslationTooltip from './components/TranslationTooltip';

// Common Pages
import NotFound from './pages/NotFound'; 
import Form from './pages/Form';

// USER
import Landing from './pages/Landing';
import UserLogin from './features/auth/Login';
import Signup from './features/auth/Signup';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Info from './StudentSide/Info';
import Courses from './StudentSide/Courses';
import Material from './StudentSide/Material';
import Schedule from './StudentSide/Schedule';
import Messages from './StudentSide/Messages';

// TUTOR
import TutorAttendance from './TutorSide/TutorAttendance';

function App() {
  return (
    <Router>
      <TranslationTooltip />
      <Routes>
        {/* Common/Test Routes */}
        <Route path="/call" element={<VideoCalling />} />

        {/* USER ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* STUDENT SIDE ROUTES */}
        <Route path="/student/info" element={<div className="animate-fadeIn"><Info /></div>} />
        <Route path="/student/courses" element={<div className="animate-fadeIn"><Courses /></div>} />
        <Route path="/student/materials" element={<div className="animate-fadeIn"><Material /></div>} />
        <Route path="/student/schedule" element={<div className="animate-fadeIn"><Schedule /></div>} />
        <Route path="/student/messages" element={<div className="animate-fadeIn"><Messages /></div>} />

        {/* TUTOR SIDE ROUTES */}
        <Route path="/tutor/attendance" element={<div className="animate-fadeIn"><TutorAttendance /></div>} />


        {/* PUBLIC FORM ROUTES */}
        <Route path="/forms/:slug" element={<Form />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
