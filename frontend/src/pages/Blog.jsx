import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, ArrowLeft, PenTool, Sparkles, BookOpen, Users } from 'lucide-react';

const Blog = ({ user, onNavigate }) => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE}/blogs`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handlePostBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBlog, userId: user.id }),
      });
      if (response.ok) {
        setNewBlog({ title: '', content: '' });
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    }
    setLoading(false);
  };

  const handleLike = async (blogId) => {
    try {
      const response = await fetch(`${API_BASE}/blogs/${blogId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      if (response.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleComment = async (blogId, text) => {
    if (!text.trim()) return;
    try {
      const response = await fetch(`${API_BASE}/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, userId: user.id }),
      });
      if (response.ok) {
        setCommentText('');
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Welcome
          </button>
          <h1 className="text-4xl font-bold text-white">Blog Community</h1>
          <div></div>
        </div>

        {showForm ? (
          /* Blog Writing Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">Write Your Blog</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
            <form onSubmit={handlePostBlog} className="space-y-4">
              <input
                type="text"
                placeholder="Blog Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <textarea
                placeholder="Share your thoughts..."
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 h-64 resize-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Blog'}
              </button>
            </form>
          </motion.div>
        ) : (
          /* Blogs List and Write Button */
          <>
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <PenTool className="w-5 h-5" />
                Write Your Blog
              </button>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center text-white">
                <p className="text-xl mb-4">No blogs yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
                    <p className="text-white/90 mb-4">{blog.content}</p>
                    <div className="flex items-center justify-between text-sm text-white/70 mb-4">
                      <span>By {blog.author.username}</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Like and Comment Buttons */}
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => handleLike(blog._id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                          blog.likes.some(like => like._id === user.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${blog.likes.some(like => like._id === user.id) ? 'fill-current' : ''}`} />
                        {blog.likes.length}
                      </button>
                      <div className="flex items-center gap-2 text-white/70">
                        <MessageCircle className="w-4 h-4" />
                        {blog.comments.length}
                      </div>
                    </div>

                    {/* Comments */}
                    <div className="space-y-2 mb-4">
                      {blog.comments.map((comment, index) => (
                        <div key={index} className="bg-white/10 rounded p-3">
                          <div className="flex items-center justify-between text-sm text-white/70 mb-1">
                            <span>{comment.user.username}</span>
                            <span>{new Date(comment.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-white">{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <button
                        onClick={() => handleComment(blog._id, commentText)}
                        className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
