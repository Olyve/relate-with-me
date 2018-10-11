/* eslint-disable global-require */

process.env.NODE_ENV = 'test';

/** Required components from common */
const {
  openTestDatabase,
  closeTestDatabase,
} = require('./test.config');

/** Set up, is called before any tests are run */
before((done) => {
  openTestDatabase().then(() => done()).catch(done);
});

/** Tear down, is called after all test run */
after((done) => {
  closeTestDatabase().then(() => done()).catch(done);
});

/**
 * Run all the tests by importing each test suite
 */
describe('Running test groups...', () => {
  describe('Testing the server...', () => {
    require('./server/app.test');
  });

  describe('Testing routes...', () => {
    require('./routes/register.test');
    require('./routes/login.test');
  });
});
