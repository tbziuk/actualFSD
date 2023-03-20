const express = require('express');
const app = express();
const hbs = require("express-handlebars");
const mongoose = require('mongoose');
const User = require('./models/UserModel');

mongoose.connect('mongodb://127.0.0.1:27017/express-1');

app.engine('hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', async (req, res) => {
    const users = await User.find().lean()
        .catch(err => console.error(`Get user error: ${err}`))
    res.render('home', { users: users })
});

app.listen(8137, () => {
    console.log('Server started');
});
