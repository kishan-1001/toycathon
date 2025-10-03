import React from 'react';
import AnimatedBackground from '../components/AnimatedBackground';

const Welcome = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      <div className="text-center text-white relative z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome, {user.username}!</h1>
        <p className="text-xl">You have successfully logged in.</p>
      </div>
    </div>
  );
};

export default Welcome;
