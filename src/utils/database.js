import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose'; /* eslint-disable-line */

mongoose.Promise = global.Promise;

/**
 * @description Opens a connection to MongoDB using Mongoose. It first looks for
 * the `MONGODB_URI` in the environment variables. If not found, it is assumed that
 * the environment is in development mode and will create/connect to a locally hosted
 * MongoDB instance.
 * @returns Promise
 */
export const open = () => new Promise((resolve, reject) => {
  // Connect to hosted db or locally hosted db
  const databaseURI = process.env.MONGODB_URI || 'mongodb://localhost/relate-with-me';
  mongoose.connect(databaseURI, (err) => {
    if (err) return reject(err);
    return resolve();
  });
});

/**
 * @description Opens a connection to an in-memory MongoDB instance using Mockgoose.
 *  This is very useful for testing when the tables may need to be reset or set up in
 *  a specific way before and after each test.
 * @returns Promise
 */
export const openTestDatabase = () => new Promise((resolve, reject) => {
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
export const close = () => mongoose.disconnect();
