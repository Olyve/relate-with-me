// Import required components
const {
  chai,
  server,
} = require('../common');

describe('App', () => {
  // =========================
  //
  // Test Index Route
  //
  // =========================

  it('sucessfully responds with 200', (done) => {
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
