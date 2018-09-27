/* eslint-disable global-require */

// Required components from common
const { openTestDatabase, closeTestDatabase } = require('./common');

// Set up
before((done) => {
  openTestDatabase().then(() => done()).catch(done);
});

// Tear down
after((done) => {
  closeTestDatabase().then(() => done()).catch(done);
});

// Run all test suites
describe('Running Relate With Me tests...', () => {
  describe('Testing main app file...', () => {
    require('./routes/index.test');
  });
});
