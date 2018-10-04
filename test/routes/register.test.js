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
          res.body.should.have.property('status').eql('Created');
          res.body.should.have.property('messages');
          res.body.messages.should.contain('Organization created.');
          done();
        });
    });
  });

  context('when recieving an invalid payload', () => {
    context('with a missing name', () => {
      it('fails and does not create a new Organization', (done) => {
        const org = {
          email: 'test@mail.com',
          password: 'password',
        };

        chai.request(server)
          .post('/register/organization')
          .send(org)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql('Bad Request');
            res.body.should.have.property('messages');
            res.body.messages.should.contain('Path `name` is required.');
            done();
          });
      });
    });
  });
});
