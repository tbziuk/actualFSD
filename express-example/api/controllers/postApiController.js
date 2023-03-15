const Post = require("../../models/PostModel");
const User = require("../../models/UserModel");

module.exports = {
    index: async (req, res) => {

        const findQuery = req.query.authorId ? { author: '640fc0416f1c775db7b1e199' } : {}

        const posts = await Post.find(findQuery).populate('author').lean()
            .catch(() => res.json({ error: `Get posts error` }))
        res.json(posts)
    },


    post: async (req, res) => {
        const post = await Post.findById(req.params.id).populate('author').lean()
            .catch(() => res.json({ error: `Get post error` }))
        res.json(post)
    },


    create: async (req, res) => {
        const newPost = new Post({ ...req.body });
        // newPost.save();

        console.log(req.user)

        // try {
        //     const userFound = await User.findById('640fc0416f1c775db7b1e199').exec();
        //     console.log(req.body);
        //     userFound.posts.push(newPost._id);
        //     await userFound.save();
        //     res.json(newPost)
        // } catch (error) {
        //     console.error(error);
        //     res.json({ error: "Get user error" });
        // }
    },


    update: async (req, res) => {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body)
            .catch(() => res.json({ error: "Update post error" }))
        res.json(updatePost)
    },

    delete: async (req, res) => {
        await Post.findByIdAndDelete(req.params.id)
            .catch(() => res.json({ error: "Delete post error" }))
        res.json({ deleted: true });
    },

    editForm: async (req, res) => {
        const post = await Post.findById(req.params.id)
            .catch(() => res.json({error: "Get post error"}))
        res.json(post)
    },
};