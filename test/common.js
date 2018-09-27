process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { openTestDatabase, closeTestDatabase } = require('./utils/database');
const server = require('../app');

chai.should(); // Required for 'should' to work in BDD chains
chai.use(chaiHttp);

module.exports = {
  chai,
  closeTestDatabase,
  openTestDatabase,
  server,
};
