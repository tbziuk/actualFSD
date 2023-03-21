const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/exbooks',  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

const booksApiRouter = require('./routes/booksApiRoutes');

app.use('/', booksApiRouter);

app.listen(8100, () => {
    console.log('Books have loaded the server');
});