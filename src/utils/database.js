const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose'); /* eslint-disable-line */

mongoose.Promise = global.Promise;

/**
 * @description Opens a connection to MongoDB using Mongoose. It first looks for
 * the `MONGODB_URI` in the environment variables. If not found, it is assumed that
 * the environment is in development mode and will create/connect to a locally hosted
 * MongoDB instance.
 * @returns Promise
 */
const openConnection = () => new Promise((resolve, reject) => {
  const user = process.env.dbUser;
  const pwd = process.env.dbPwd;
  // Connect to hosted db or locally hosted db
  const databaseURI = `mongodb://${user}:${pwd}@ds018568.mlab.com:18568/relate-with-me`;
  mongoose.connect(databaseURI)
    .then(() => resolve())
    .catch(err => reject(err));
});

/**
 * @description Opens a connection to an in-memory MongoDB instance using Mockgoose.
 *  This is very useful for testing when the tables may need to be reset or set up in
 *  a specific way before and after each test.
 * @returns Promise
 */
const openTestDatabase = () => new Promise((resolve, reject) => {
  const mockDB = new Mockgoose(mongoose);

  mockDB.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost/test-db', (err) => {
      if (err) return reject(err);
      return resolve();
    });
  }).catch(err => reject(err));
});

/**
 * @description Closes the mongoose connection to MongoDB.
 */
const closeConnection = () => mongoose.disconnect();

module.exports = {
  openConnection,
  openTestDatabase,
  closeConnection,
};
