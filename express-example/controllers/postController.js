const Post = require("../models/PostModel");
const User = require("../models/UserModel");

module.exports = {
    index: async (req, res) => {

        const findQuery = req.query.authorId ? { author: req.query.authorId } : {}

        const posts = await Post.find(findQuery).populate('author').lean()
            .catch(err => console.error(`Get posts error: ${err}`))
        res.render('blogViews/blog', { posts: posts })
    },


    post: async (req, res) => {
        const post = await Post.findById(req.params.id).populate('author').lean()
            .catch(() => res.send(`Get post error`))
        res.render('blogViews/singlePost', post)
    },


    create: async (req, res) => {
        const newPost = new Post({ ...req.body, author: res.locals.userId });
        newPost.save();

        try {
            const userFound = await User.findById(res.locals.userId).exec();
            userFound.posts.push(newPost._id);
            await userFound.save();
            res.redirect('/blog');
        } catch (error) {
            console.error(error);
            res.send("Get user error");
        }
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