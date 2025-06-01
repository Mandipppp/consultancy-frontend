import React from 'react';
import { BookOpen, Video, FileText, MessageSquare, BarChart2, CalendarDays, StickyNote, Megaphone } from 'lucide-react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back, Student 👋</h1>
        <p className="text-slate-600 mb-6 text-sm">Track your learning, access resources, and prepare for your next class.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Enrolled Courses */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center mb-3">
              <BookOpen className="text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold text-slate-700">Your Courses</h2>
            </div>
            <ul className="text-sm text-slate-600 space-y-2 list-disc ml-5">
              <li>Frontend Fundamentals</li>
              <li>IELTS Speaking Mastery</li>
              <li>Advanced Grammar Workshop</li>
            </ul>
          </div>

          {/* Upcoming Live Classes */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center mb-3">
              <CalendarDays className="text-teal-600 mr-2" />
              <h2 className="text-lg font-semibold text-slate-700">Upcoming Classes</h2>
            </div>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>React Workshop – May 28 @ 6 PM</li>
              <li>IELTS Listening – May 30 @ 3 PM</li>
              <li>Grammar Boost – June 1 @ 11 AM</li>
            </ul>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center mb-3">
              <Megaphone className="text-pink-600 mr-2" />
              <h2 className="text-lg font-semibold text-slate-700">Announcements</h2>
            </div>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>🎉 New writing resources added!</li>
              <li>🚧 Site maintenance on June 2</li>
            </ul>
          </div>

          {/* Class Recordings */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center mb-3">
              <Video className="text-rose-600 mr-2" />
              <h2 className="text-lg font-semibold text-slate-700">Recorded Sessions</h2>
            </div>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>🌐 Introduction to IELTS Writing – Watch Now</li>
              <li>📘 Past Tense Masterclass – Watch Now</li>
            </ul>
          </div>

          {/* Notes & Templates */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center mb-3">
              <StickyNote className="text-yellow-500 mr-2" />
              <h2 className="text-lg font-semibold text-slate-700">Collaborative Notes</h2>
            </div>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>📝 Writing Task 2 – Peer Notes</li>
              <li>🗂️ IELTS Speaking Part 3 Ideas</li>
            </ul>
          </div>

          {/* Messaging */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center mb-3">
              <MessageSquare className="text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-slate-700">Messages</h2>
            </div>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>💬 You have 2 new messages from tutors</li>
              <li>📣 Group discussion ongoing: "Task 1 Tips"</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center mb-3">
              <FileText className="text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-slate-700">Recommended Resources</h2>
            </div>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>📕 IELTS Handbook PDF</li>
              <li>🎥 Speaking Techniques (YouTube)</li>
              <li>🧾 Printable Grammar Cheat Sheet</li>
            </ul>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center mb-3">
              <BarChart2 className="text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold text-slate-700">Progress Overview</h2>
            </div>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>📊 78% course completion</li>
              <li>⏱️ 5 hrs watched this week</li>
              <li>🔥 2 classes attended this week</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
