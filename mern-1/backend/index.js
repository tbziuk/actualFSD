const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mern1',  { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

const formRouter = require('./routes/formRouter');

app.use('/', formRouter);

app.listen(8300, () => {
  console.log('Server started');
});