const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * @description Opens a connection to MongoDB using Mongoose. It first looks for
 * the `MONGODB_URI` in the environment variables. If not found, it is assumed that
 * the environment is in development mode and will create/connect to a locally hosted
 * MongoDB instance.
 * @returns Promise
 */
const openConnection = () => new Promise((resolve, reject) => {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => resolve())
    .catch(err => reject(err));
});

/**
 * @description Closes the mongoose connection to MongoDB.
 */
const closeConnection = () => mongoose.disconnect();

module.exports = {
  openConnection,
  closeConnection,
};
