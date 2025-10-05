import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Moon, Sun, ArrowLeft } from 'lucide-react';

const Settings = ({ user, setUser, onNavigate, theme, setTheme }) => {
  const [privacy, setPrivacy] = useState(user.privacy || 'private');
  const [username, setUsername] = useState(user.username || '');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setPrivacy(user.privacy || 'private');
    setUsername(user.username || '');
  }, [user]);

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await axios.put('http://localhost:5000/api/auth/update', {
        id: user.id,
        privacy,
        username,
      });
      setUser(response.data.user);
      alert('Settings saved successfully');
    } catch (error) {
      alert('Failed to save settings: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 p-6 mt-10">
        <button
          onClick={() => onNavigate('welcome')}
          className="mb-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Account Settings</h2>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Change Username</label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isEditingUsername}
              onChange={(e) => setIsEditingUsername(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Enable username editing</span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isEditingUsername}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Profile Visibility</label>
          <select
            value={privacy}
            onChange={handlePrivacyChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Theme</label>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
