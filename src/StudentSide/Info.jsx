import React from 'react';
import logoSharp from '../assets/images/logo_sharp.png';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPen, faGear } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

const Info = () => {
  const weeklyStats = [
    { day: 'Sun', value: 0 },
    { day: 'Mon', value: 180 },
    { day: 'Tue', value: 120 },
    { day: 'Wed', value: 200 },
    { day: 'Thu', value: 150 },
    { day: 'Fri', value: 250 },
    { day: 'Sat', value: 100 }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container with Black Background */}
      <div className="flex-1 bg-black p-4">
        <div className="bg-white rounded-2xl h-full flex overflow-hidden">
          {/* Profile Section */}
          <div className="w-80 bg-white p-8 flex flex-col border-r border-gray-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-gray-900">Ashok Dhungana</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <FontAwesomeIcon icon={faPen} className="text-sm" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <FontAwesomeIcon icon={faGear} className="text-sm" />
                </button>
              </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
              This is Ashok. I am eager to learn new languages, and also eager to go abroad. So two eagers combined... Yeahhhh!!!
            </p>
            
            <div className="mt-auto">
              <div className="bg-slate-800 text-white px-4 py-3 rounded-full flex items-center space-x-3 w-fit">
                <span className="text-lg">💎</span>
                <span className="font-bold text-lg">100</span>
                <span className="text-sm opacity-80">PT</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto relative">
        {/* Logo positioned at top right */}
        <div className="absolute top-6 right-8 z-10">
          <img 
            src={logoSharp} 
            alt="Langzy Logo" 
            className="h-16 w-auto"
          />
        </div>
        
        <div className="max-w-6xl space-y-10">
          {/* Languages Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Languages</h3>
            <div className="flex items-start space-x-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-3xl text-white w-64">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🇩🇪</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">A1</span>
                </div>
                <div className="mb-3">
                  <h4 className="font-bold text-xl">German</h4>
                </div>
                <div className="flex items-center space-x-2 text-sm opacity-90">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-xs" />
                  <span>June 30</span>
                </div>
              </div>
              <div className="w-48 h-40 border-2 border-dashed border-gray-300 rounded-3xl flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                <span className="text-5xl text-gray-400">+</span>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Statistics</h3>
            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-6">
              <div className="flex-1">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyStats}
                      margin={{
                        top: 30,
                        right: 30,
                        left: 20,
                        bottom: 40,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        tickMargin={12}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        tickMargin={12}
                        domain={[0, 300]}
                        ticks={[0, 50, 100, 150, 200, 250, 300]}
                        interval={0}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: '500',
                          padding: '12px 16px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                        }}
                        labelStyle={{
                          color: '#e5e7eb',
                          marginBottom: '4px'
                        }}
                        formatter={(value, name) => [
                          `${value} minutes`,
                          'Study Time'
                        ]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ 
                          fill: '#3b82f6', 
                          strokeWidth: 2, 
                          stroke: '#ffffff',
                          r: 5 
                        }}
                        activeDot={{ 
                          r: 7, 
                          fill: '#3b82f6',
                          stroke: '#ffffff',
                          strokeWidth: 3
                        }}
                        animationDuration={1000}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Progress Section - Right Side */}
              <div className="flex flex-col justify-center h-80 ml-8">
                <div className="bg-gray-900 rounded-2xl p-6 text-white w-48 h-64 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold mb-6 text-white">Progress</h3>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-300">Consistency</div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold">20</span>
                      <span className="text-xl text-gray-300">/30</span>
                      <span className="text-sm text-gray-400 ml-2">days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Tutors Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Assigned Tutors</h3>
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mx-auto mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face" 
                    alt="Tutor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-700">Binod Chalise</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mx-auto mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face" 
                    alt="Tutor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-700">Ganesh Parajuli</p>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
