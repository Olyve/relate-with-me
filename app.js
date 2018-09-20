const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const helmet = require('helmet');
const path = require('path');

// Import Routers
const indexRouter = require('./routes/index');

// Create app instance
const app = express();

// Setup logging
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Setup Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Setup public directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure session

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

// Error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.statusCode || 500);
  res.json({
    status: 'An error has occured',
    message: res.locals.error,
  });
});

module.exports = app;
