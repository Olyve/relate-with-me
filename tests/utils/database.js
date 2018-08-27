const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');

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

module.exports = {
  openTestDatabase,
};
