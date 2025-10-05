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

      {/* Clash of Clans Style Island Images with 3D Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 7 }, (_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const leftPositions = row % 2 === 0 ? ['5%', '30%', '55%', '80%'] : ['15%', '40%', '65%'];
          return (
            <motion.img
              key={i}
              src="/Screenshot_2025-10-05_225215-removebg-preview.png"
              alt="Island"
            className="absolute w-80 h-64 object-contain"
              style={{
                left: leftPositions[col],
                top: row === 0 ? '20%' : '60%',
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                rotateY: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              whileHover={{
                scale: 1.2,
                rotateY: 20,
                transition: { duration: 0.3 },
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdventurePage;
