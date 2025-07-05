import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoCalling from './test/VideoCalling';

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


function App() {
  return (
    <Router>
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
        <Route path="/student/info" element={<Info />} />

        {/* PUBLIC FORM ROUTES */}
        <Route path="/forms/:slug" element={<Form />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
