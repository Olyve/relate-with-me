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
    /**
     * Name Validation
     */
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

    /**
     * Email validation
     */
    context('with a missing email address', () => {
      it('fails and does not create a new Organization', (done) => {
        const org = {
          name: 'Apple',
          password: 'password',
        };

        chai.request(server)
          .post('/register/organization')
          .send(org)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql('Bad Request');
            res.body.should.have.property('messages');
            res.body.messages.should.contain('Path `email` is required.');
            done();
          });
      });
    });

    context('with an invalid email address', () => {
      it('fails and does not create a new Organization', (done) => {
        const org = {
          name: 'Apple',
          email: 'Not an email',
          password: 'password',
        };

        chai.request(server)
          .post('/register/organization')
          .send(org)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql('Bad Request');
            res.body.should.have.property('messages');
            res.body.messages.should.contain('Not a valid email address.');
            done();
          });
      });
    });

    /**
     * Password validation
     */
    context('with a missing password', () => {
      it('fails and does not create a new Organization', (done) => {
        const org = {
          name: 'Apple',
          email: 'test@mail.com',
        };

        chai.request(server)
          .post('/register/organization')
          .send(org)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql('Bad Request');
            res.body.should.have.property('messages');
            res.body.messages.should.contain('Path `password` is required.');
            done();
          });
      });
    });

    context('with a password that is too short', () => {
      it('fails and does not create a new Organization', (done) => {
        const org = {
          name: 'Apple',
          email: 'test@mail.com',
          password: 'pass',
        };

        chai.request(server)
          .post('/register/organization')
          .send(org)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').eql('Bad Request');
            res.body.should.have.property('messages');
            res.body.messages.should.contain('Password is too short.');
            done();
          });
      });
    });
  });
});
