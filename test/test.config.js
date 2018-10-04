process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
const server = require('../app');

/** Import Models */
const Organization = require('../models/organization');

/** Set Mongoose Promise */
mongoose.Promise = global.Promise;

/** Setup Chai and Chai Http */
chai.should();
chai.use(chaiHttp);

/**
 * @description Opens a connection to an in-memory MongoDB instance using
 *  Mockgoose. This is very useful for testing when the tables may need to be
 *  reset or set up in a specific way before and after each test.
 * @returns {Promise} the result of attempting to open a connection
 */
const openTestDatabase = () => new Promise((resolve, reject) => {
  const mockDB = new Mockgoose(mongoose);

  mockDB.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost/test-db', { useNewUrlParser: true })
      .then(() => resolve())
      .catch(err => reject(err));
  });
});

const closeTestDatabase = () => mongoose.disconnect();

module.exports = {
  chai,
  closeTestDatabase,
  openTestDatabase,
  server,
  Organization,
};
