import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, ArrowLeft, PenTool, Sparkles, BookOpen, Users, User, Edit, Upload, LogOut, Settings, Trophy, Bell, Moon, Sun, HelpCircle } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const Blog = ({ user, onNavigate }) => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE}/blogs`);
      const data = await response.json();
      setBlogs(data.map(blog => ({ ...blog, id: blog._id, showComments: false, commentText: '' })));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handlePostBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;

    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBlog, userId: user.id }),
      });
      if (response.ok) {
        setNewBlog({ title: '', content: '' });
        fetchBlogs();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to post blog');
      }
    } catch (error) {
      console.error('Error posting blog:', error);
      setErrorMessage('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleLike = async (blogId) => {
    const blog = blogs.find(b => b.id === blogId);
    const isLiked = blog.likes.some(like => like._id === user.id);
    // Optimistically update
    setBlogs(blogs.map(b => b.id === blogId ? { ...b, likes: isLiked ? b.likes.filter(like => like._id !== user.id) : [...b.likes, { _id: user.id, username: user.username }] } : b));
    try {
      const response = await fetch(`${API_BASE}/blogs/${blogId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      if (response.ok) {
        fetchBlogs();
      } else {
        // Revert
        setBlogs(blogs.map(b => b.id === blogId ? { ...b, likes: isLiked ? [...b.likes, { _id: user.id, username: user.username }] : b.likes.filter(like => like._id !== user.id) } : b));
      }
    } catch (error) {
      console.error('Error liking blog:', error);
      // Revert
      setBlogs(blogs.map(b => b.id === blogId ? { ...b, likes: isLiked ? [...b.likes, { _id: user.id, username: user.username }] : b.likes.filter(like => like._id !== user.id) } : b));
    }
  };

  const handleComment = async (blogId, text) => {
    if (!text.trim()) return;
    const newComment = {
      user: { _id: user.id, username: user.username },
      text,
      date: new Date(),
    };
    // Optimistically add comment and clear input
    setBlogs(blogs.map(b => b.id === blogId ? { ...b, comments: [...b.comments, newComment], commentText: '' } : b));
    try {
      const response = await fetch(`${API_BASE}/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, userId: user.id }),
      });
      if (response.ok) {
        fetchBlogs();
      } else {
        // Revert
        setBlogs(blogs.map(b => b.id === blogId ? { ...b, comments: b.comments.slice(0, -1), commentText: text } : b));
      }
    } catch (error) {
      console.error('Error commenting:', error);
      // Revert
      setBlogs(blogs.map(b => b.id === blogId ? { ...b, comments: b.comments.slice(0, -1), commentText: text } : b));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameEdit = () => {
    setIsEditingUsername(!isEditingUsername);
  };

  const handleUsernameSave = () => {
    setIsEditingUsername(false);
    // Here you could save to backend if needed
  };

  const handleLogout = () => {
    onNavigate('login');
  };

  const handleOptionClick = (option) => {
    alert(`${option} clicked!`);
    // Placeholder for navigation or actions
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 p-4 relative overflow-hidden">
      <AnimatedBackground />

      {/* Floating Animated Icons */}
      <motion.div
        className="absolute top-20 left-10 z-0"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-8 h-8 text-yellow-300 opacity-70" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 z-0"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <PenTool className="w-10 h-10 text-pink-300 opacity-60" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 z-0"
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <BookOpen className="w-12 h-12 text-blue-300 opacity-50" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 z-0"
        animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Users className="w-9 h-9 text-green-300 opacity-65" />
      </motion.div>

      {/* Profile Dropdown */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          {/* Profile Icon */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300" />
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="flex items-center gap-2">
                {isEditingUsername ? (
                  <>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handleUsernameSave}
                      className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-gray-900">{username}</span>
                    <button
                      onClick={handleUsernameEdit}
                      className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Email and Role */}
            <div className="mb-4">
              <p className="text-sm text-gray-700"><span className="font-medium">📧 Email:</span> {user.email || 'user@gmail.com'}</p>
              <p className="text-sm text-gray-700"><span className="font-medium">🎭 Role:</span> {user.role || 'Student'}</p>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
              <button onClick={() => handleOptionClick('Account Settings')} className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Settings className="w-4 h-4" /> Account Settings
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

      {/* Back Button */}
      <motion.button
        onClick={() => onNavigate('welcome')}
        className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-2">Blog Adventures</h1>
          <p className="text-xl opacity-90">Share your thoughts and connect with others</p>
        </motion.div>

        {/* Write Blog Button */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showForm ? 'Cancel Writing' : 'Write Your Blog'}
          </motion.button>
        </motion.div>

        {/* Blog Creation Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              onSubmit={handlePostBlog}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </motion.div>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <textarea
                  placeholder="Share your thoughts..."
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  rows="6"
                  required
                />
              </motion.div>
              {errorMessage && (
                <motion.div
                  className="mb-4 text-red-300 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errorMessage}
                </motion.div>
              )}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Posting...' : 'Post Blog'}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Blog List */}
        <motion.div
          className="space-y-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{blog.title}</h3>
                <p className="text-white/80 leading-relaxed">{blog.content}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => handleLike(blog.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                      blog.likes?.some(like => like._id === user.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`w-5 h-5 ${blog.likes?.some(like => like._id === user.id) ? 'fill-current' : ''}`} />
                    <span>{blog.likes?.length || 0}</span>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setBlogs(blogs.map(b => b.id === blog.id ? { ...b, showComments: !b.showComments } : b));
                      setTimeout(() => {
                        const commentInput = document.getElementById(`comment-${blog.id}`);
                        commentInput?.focus();
                      }, 100); // small delay to allow render
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{blog.comments?.length || 0}</span>
                  </motion.button>
                </div>
                <span className="text-white/60 text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {blog.showComments && (
                  <motion.div
                    className="mt-4 space-y-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {blog.comments?.map((comment, commentIndex) => (
                      <motion.div
                        key={commentIndex}
                        className="bg-white/10 rounded-lg p-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: commentIndex * 0.1 }}
                      >
                        <p className="text-white/90">{comment.text}</p>
                        <span className="text-white/60 text-xs">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </motion.div>
                    ))}
                    <div className="flex space-x-2">
                      <input
                        id={`comment-${blog.id}`}
                        type="text"
                        placeholder="Add a comment..."
                        value={blog.commentText}
                        onChange={(e) => setBlogs(blogs.map(b => b.id === blog.id ? { ...b, commentText: e.target.value } : b))}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(blog.id, blog.commentText);
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <motion.button
                        onClick={() => handleComment(blog.id, blog.commentText)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {blogs.length === 0 && (
          <motion.div
            className="text-center text-white/70 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No blogs yet. Be the first to share your adventure!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
