const { Post } = require('../models');


exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
           res.json({ total: posts.count, data: posts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};


exports.getPostById = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
};

exports.createPost = async (req, res) => {
    const { title, content,author,publishedAt } = req.body;
    const post = await Post.create({ title, content, userId: req.userId, author, publishedAt: new Date(publishedAt), });
    res.status(201).json(post);
};