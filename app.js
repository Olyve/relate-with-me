const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');

// Create app instance
const app = express();

// Setup logging
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);

module.exports = app;
