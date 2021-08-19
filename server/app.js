const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/app-routes');
const adminRoutes = require('./routes/admin');
const statRoutes = require('./routes/stats');
const { handleError } = require('./util/Error');

require('dotenv').config();
require('./config/dbconfig');

const app = express();

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT);
  res.header('Access-Control-Allow-Headers', 'Content-Type, jwt, token');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use(
  rateLimit({
    windowMs: 10 * 1000, // 10 second window
    max: 6, // start blocking after 6 requests
    message:
      'Too many requests from this IP, please try again when you are done enforcing brute force attacks 😊',
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(statRoutes);
app.use('/auth', authRoutes);
app.use('/api', appRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  const err = new Error('Unknown Route');
  err.status = 404;
  next(err);
});

// Global error handler
app.use(async (err, req, res, next) => {
  console.log(err.message);
  const { username, password } = handleError(err);
  if (username === '' && password === '') {
    res.status(err.status || 490).json({
      error: err.message,
    });
  } else {
    res.status(400).json({ username, password });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
