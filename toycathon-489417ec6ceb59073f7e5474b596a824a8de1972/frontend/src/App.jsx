import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Blog from './pages/Blog';
import Chatbot from './components/Chatbot';
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
        return <Welcome key="welcome" user={user} onNavigate={handleNavigate} />;
      case 'blog':
        return <Blog key="blog" user={user} onNavigate={handleNavigate} />;
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
      <Chatbot />
    </div>
  );
};

export default App;