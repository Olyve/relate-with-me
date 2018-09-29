/**
 * @file The configuration file for the database. It utilizes mongoose as
 * the intermediary between the server and MongoDB.
 * @author Sam Galizia
 *
 * @module Config/Database
 * @requires {@link https://www.npmjs.com/package/mongoose Mongoose}
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * @function
 * @description Opens a connection to MongoDB using Mongoose. It first looks for
 * the MONGODB_URI in the environment variables. If not found, it is assumed
 * that the environment is in development mode and will create/connect to a
 * locally hosted MongoDB instance.
 * @returns {Promise} the result of attempting to open a connection
 * to MongoDB.
 */
const openConnection = () => new Promise((resolve, reject) => {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => resolve())
    .catch(err => reject(err));
});

/**
 * @function
 * @description Closes the mongoose connection to MongoDB.
 * @returns {Promise} the result of attempting to close the connection
 * to MongoDB.
 */
const closeConnection = () => mongoose.disconnect();

module.exports = {
  openConnection,
  closeConnection,
};
