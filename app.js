/**
 * @file The configuration file for the server. The majority of setup that will
 * configure the server will happen here.
 * @author Sam Galizia
 *
 * @module Server/App
 * @requires {@link https://www.npmjs.com/package/express Express}
 * @requires {@link https://www.npmjs.com/package/morgan Morgan}
 * @requires {@link https://www.npmjs.com/package/helmet Helmet}
 * @requires {@link https://nodejs.org/api/path.html Path}
 * @returns {Express} The configured server
 */

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const indexRouter = require('./routes/index.routes');

/** Create instance of Express App */
const app = express();

/** Setup logging if running in dev mode */
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

/** Configure middleware to be run on all routes */
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Configure docs directory */
app.use('/docs', express.static(path.join(__dirname, '/docs')));

/** Configure the routes */
app.use('/', indexRouter);

module.exports = app;
