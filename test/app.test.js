// Import required components
const {
  chai,
  server,
} = require('./common');

// =========================
//
// Test Index Route
//
// =========================
describe('server', () => {
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
