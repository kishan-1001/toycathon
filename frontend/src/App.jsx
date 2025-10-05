import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Blog from './pages/Blog';
import Settings from './pages/Settings';
import AdventurePage from './pages/AdventurePage';
import Chatbot from './components/Chatbot';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

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
        return <Welcome key="welcome" user={user} onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />;
      case 'settings':
        return <Settings key="settings" user={user} setUser={setUser} onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />;
      case 'blog':
        return <Blog key="blog" user={user} onNavigate={handleNavigate} />;
      case 'adventure':
        return <AdventurePage key="adventure" onNavigate={handleNavigate} />;
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