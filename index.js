/**
 * @file The configured server is loaded into this file and run using the
 * commands to open a database conenction and start. This is the file run once
 * it is hosted, making it the entry point for the server.
 * @author Sam Galizia
 *
 * @module Server/Index
 * @requires module:App
 * @requires module:Logger
 * @requires module:Database~openConnection
 */

const app = require('./app');
const logger = require('./utils/logger');
const { openConnection } = require('./config/database');

/** Configure environment variables for local dev use */
require('dotenv').config();

/** @constant {number} PORT the port that the server will run on */
const PORT = process.env.PORT || 3030;

openConnection()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Relate-With-Me is runing in ${process.env.NODE_ENV} mode on port ${PORT}.`);
    });
  })
  .catch(err => logger.error(err));
