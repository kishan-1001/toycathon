import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleNavigate = (page, data) => {
    if (data && data.user) {
      setUser(data.user);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <Signup key="signup" onNavigate={handleNavigate} />;
      case 'welcome':
        return <Welcome key="welcome" user={user} />;
      case 'login':
      default:
        return <Login key="login" onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>
  );
};

export default App;