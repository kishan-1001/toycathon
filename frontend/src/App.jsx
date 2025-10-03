import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="relative overflow-hidden">
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          currentPage === 'login' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'
        }`}
      >
        <Login onNavigate={setCurrentPage} />
      </div>
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          currentPage === 'signup' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'
        }`}
      >
        <Signup onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}
