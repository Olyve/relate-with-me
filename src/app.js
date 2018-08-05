import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import helmet from 'helmet';

// Import Routers
import indexRouter from './routes/index';

const app = express();

// Setup logging
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Middleware
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

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

export default app;
