const Post = require("../models/PostModel")

module.exports = {
    index: async (req, res) => {
        const posts = await Post.find({}).lean()
            .catch(err => console.error(`Get posts error: ${err}`))
            res.render('blogViews/blog', { posts: posts })
    },
    post: async (req, res) => {
        const post = await Post.findById(req.params.id)
            .catch(() => res.send(`Get post error`))
        res.render('blogViews/singlePost', post)
    },
    create: (req, res) => {
        const newPost = new Post({ ...req.body, author: 'Jan' });
        newPost.save()

        res.redirect('/blog');
    },
    update: async (req, res) => {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body)
            .catch(() => res.send(`Update post error`))
        res.redirect('/blog/' + updatePost._id)
    },
    delete: async (req, res) => {
        await Post.findByIdAndDelete(req.params.id)
            .catch(() => res.send(`Delete post error`))
        res.redirect('/blog');
    },
    editForm: async (req, res) => {
        const post = await Post.findById(req.params.id)
            .catch(() => res.send(`Get post error`))
        res.render('blogViews/editPost', post)
    },
};