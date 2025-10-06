import React, { useState, useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import AdventureDoors from '../components/AdventureDoors';
import { motion } from 'framer-motion';
import { User, Edit, Upload, LogOut, Settings, BookOpen, Trophy, Bell, Moon, Sun, HelpCircle } from 'lucide-react';
import axios from 'axios';



const Welcome = ({ user, onNavigate, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = user.username;


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result;
        try {
          await axios.put('http://localhost:5000/api/auth/update-profile-picture', {
            id: user.id,
            profilePicture: base64,
          });
          setUser({ ...user, profilePicture: base64 });
        } catch (error) {
          alert('Error uploading profile picture: ' + error.message);
        }
      };
      reader.readAsDataURL(file);
    }
  };



  const handleLogout = () => {
    onNavigate('login');
  };

  const handleOptionClick = (option) => {
    alert(`${option} clicked!`);
    // Placeholder for navigation or actions
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center p-4 relative">
      <AnimatedBackground />

      {/* Welcome Message */}
      <div className="text-center text-white relative z-10 mt-8">
        <h1 className="text-5xl font-bold mb-2">Welcome, {username}!</h1>
      </div>

      {/* Profile Section */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          {/* Profile Icon */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={isDropdownOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-14 right-0 w-64 bg-white/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 p-4 ${isDropdownOpen ? 'block' : 'hidden'}`}
          >
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-300">
                    <User className="w-8 h-8 text-indigo-600" />
                  </div>
                )}
                <label className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
                  <Upload className="w-3 h-3" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Username Section */}
            <div className="mb-4">
              <p className="text-sm text-gray-700"><span className="font-medium">Username:</span> {username}</p>
            </div>

            {/* Email and Role */}
            <div className="mb-4">
              <p className="text-sm text-gray-700"><span className="font-medium">📧 Email:</span> {user.email || 'user@gmail.com'}</p>
              <p className="text-sm text-gray-700"><span className="font-medium">🎭 Role:</span> {user.role || 'Student'}</p>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
              <button onClick={() => onNavigate('settings')} className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Settings className="w-4 h-4" /> Account Settings
              </button>
              <button onClick={() => onNavigate('avatar-selection')} className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <User className="w-4 h-4" /> Change Avatar
              </button>
              <button onClick={() => handleOptionClick('My Adventures')} className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <BookOpen className="w-4 h-4" /> My Adventures
              </button>
              <button onClick={() => handleOptionClick('Achievements')} className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Trophy className="w-4 h-4" /> Achievements
              </button>
              <button onClick={() => handleOptionClick('Notifications')} className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Bell className="w-4 h-4" /> Notifications
              </button>
              {/* Removed theme toggle from dropdown */}
              <button onClick={() => handleOptionClick('Help & Support')} className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <HelpCircle className="w-4 h-4" /> Help & Support
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        </div>
      </div>

      <div className="text-center text-white relative z-10 mt-16">
        {/* Doors Section */}
        <AdventureDoors onNavigate={onNavigate} userAvatar={user.avatar} />
      </div>
    </div>
  );
};

export default Welcome;
