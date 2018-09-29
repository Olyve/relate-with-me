/** Import required components */
const {
  chai,
  server,
} = require('../test.config');

/** Test Organization Registration */
describe('POST /register/organization', () => {
  context('when receiving a valid payload', () => {
    it('creates a new Organization', (done) => {
      const org = {
        name: 'Apple',
        email: 'test@mail.com',
        password: 'password',
      };

      chai.request(server)
        .post('/register/organization')
        .send(org)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
