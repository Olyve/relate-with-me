/* eslint-disable no-console, arrow-body-style */
/** Import required components */
const {
  chai,
  server,
} = require('../test.config');

/** Test the server */
describe('The server', () => {
  it('sucessfully launches and responds', () => {
    return new Promise(async (resolve, reject) => {
      const res = await chai.request(server).get('/');

      try {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('Success');
        res.body.should.have.property('messages');
        res.body.messages.should.contain('Request succeeded.');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });

  it('ignores requests for the favicon.ico', () => {
    return new Promise(async (resolve, reject) => {
      const res = await chai.request(server).get('/favicon.ico');

      try {
        res.should.have.status(404);
        res.body.should.have.property('status').eql('Not Found');
        res.body.should.have.property('messages');
        res.body.messages.should.contain('There is no favorite icon.');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
});

/**
 * In reality, this test is rather brittle. For the moment, I can only think to
 * test that you are getting the right headers. The content is generated
 * dynamically and therefore I do not really know how to test this.
 */
describe('The documentation', () => {
  context('GET /docs', () => {
    it('returns the docs', () => {
      return new Promise(async (resolve, reject) => {
        const res = await chai.request(server).get('/docs');

        try {
          res.should.have.status(200);
          res.should.have.header('Content-Type', 'text/html; charset=UTF-8');
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });
});
