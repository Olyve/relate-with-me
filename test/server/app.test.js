// Import required components
const {
  chai,
  server,
} = require('../test.config');

/** Test Server Launching */
describe('The server', () => {
  it('sucessfully launches and responds', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('messages');
        res.body.messages.should.contain('Request succeeded.');
        done();
      });
  });
});

/**
 * In reality, this test is rather brittle. For the moment, I can only think to
 * test that you are getting the right headers. The content is generated
 * dynamically and therefore I do not really know how to test this.
 */
describe('The documentation', () => {
  it('GET /docs', (done) => {
    chai.request(server)
      .get('/docs')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header('Content-Type', 'text/html; charset=UTF-8');
        done();
      });
  });
});
