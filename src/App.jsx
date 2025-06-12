import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoCalling from './test/VideoCalling';

// Common Pages
import NotFound from './pages/NotFound'; 

// USER
import Landing from './pages/Landing';
import UserLogin from './features/auth/UserLogin';
import Signup from './features/auth/Signup';


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


        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
