import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdventurePage = ({ onNavigate }) => {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/backgrond.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Back to Welcome Button */}
      <div className="absolute top-4 left-4 z-20">
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => onNavigate('welcome')}
          className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm border border-white rounded-full text-white font-semibold text-base hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105"
        >
          Back to Welcome
        </motion.button>
      </div>

      {/* Title */}
      {showTitle && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-bold text-center text-white"
          >
            Your Adventure Begins!
          </motion.h1>
        </div>
      )}
    </div>
  );
};

export default AdventurePage;
