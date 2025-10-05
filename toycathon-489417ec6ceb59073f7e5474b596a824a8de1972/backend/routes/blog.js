const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');

// Middleware to check if user is authenticated (simplified, assuming user id is sent in headers or body)
const requireAuth = (req, res, next) => {
    // In a real app, verify JWT token
    // For now, assume userId is provided in req.body or req.headers
    console.log('requireAuth middleware - req.body.userId:', req.body.userId, 'req.headers.userid:', req.headers.userid);
    if (!req.body.userId && !req.headers.userid) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        req.userId = new mongoose.Types.ObjectId(req.body.userId || req.headers.userid);
    } catch (err) {
        console.error('Invalid userId:', err);
        return res.status(400).json({ error: 'Invalid userId' });
    }
    next();
};

// GET /api/blogs - Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username').populate('likes', 'username').populate('comments.user', 'username').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/blogs - Create a new blog
router.post('/', requireAuth, async (req, res) => {
    console.log('POST /api/blogs - req.body:', req.body);
    console.log('POST /api/blogs - req.userId:', req.userId);
    try {
        const { title, content } = req.body;
        const blog = new Blog({
            title,
            content,
            author: req.userId,
        });
        await blog.save();
        await blog.populate('author', 'username');
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST /api/blogs/:id/like - Like or unlike a blog
router.post('/:id/like', requireAuth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        const userId = req.userId;
        const likeIndex = blog.likes.indexOf(userId);
        if (likeIndex > -1) {
            blog.likes.splice(likeIndex, 1); // Unlike
        } else {
            blog.likes.push(userId); // Like
        }
        await blog.save();
        await blog.populate('likes', 'username');
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/blogs/:id/comment - Add a comment to a blog
router.post('/:id/comment', requireAuth, async (req, res) => {
    try {
        const { text } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        blog.comments.push({
            user: req.userId,
            text,
        });
        await blog.save();
        await blog.populate('comments.user', 'username');
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
