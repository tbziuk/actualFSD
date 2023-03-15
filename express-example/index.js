const express = require('express');
const app = express();
const hbs = require("express-handlebars");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Post = require('./models/PostModel');

mongoose.connect('mongodb://127.0.0.1:27017/express-blog');


app.use('/files', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

app.engine('hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get("/mongoose/:id", async function (req, res) {
    let post = await Post.findById(req.params.id)
    if (!post) return res.json({ message: "Post not found" });
    res.render("home", {
        title: post.title,
        content: post.content,
        displayTitle: true,
        names: ["Adam", "Ola", "Kasia", "Tomek"],
    });
});

app.get('/', (req, res) => {
    res.render('home', {
        title: 'My app title',
        content: 'Lorem ipsum',
        displayTitle: true,
        names: ["Adam", "Ola", "Kasia", "Tomek"],
    });
});

const authHelper = require('./middlewares/authHelper');

const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/blog', authHelper, blogRouter);
app.use('/user', userRouter);

const blogApiRouter = require('./api/routes/blogApiRoutes');
app.use('/api/blog', blogApiRouter);

app.listen(8080, () => {
    console.log('Server started');
});
