// Import required components
const {
  chai,
  server,
} = require('./common');

describe('App', () => {
  // =========================
  //
  // Test Index Route
  //
  // =========================

  describe('Launches', () => {
    it('sucessfully responds with 200', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
