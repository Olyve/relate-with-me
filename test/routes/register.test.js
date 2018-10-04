/* eslint-disable no-console, arrow-body-style */
/** Import required components */
const {
  chai,
  server,
  Organization,
} = require('../test.config');

/** Test Organization Registration */
describe('POST /register/organization', () => {
  /** Remove all records before each test */
  beforeEach((done) => {
    Organization.remove({}, () => { done(); });
  });

  context('when receiving a valid payload', () => {
    it('creates a new Organization', () => {
      return new Promise(async (resolve) => {
        const org = {
          name: 'Apple',
          email: 'test@mail.com',
          password: 'password',
        };

        const res = await chai.request(server)
          .post('/register/organization')
          .send(org);

        res.should.have.status(201);
        res.body.should.have.property('status').eql('Created');
        res.body.should.have.property('messages');
        res.body.messages.should.contain('Organization created.');
        resolve();
      });
    });
  });

  context('when recieving an invalid payload', () => {
    /**
     * Name Validation
     */
    context('with a missing name', () => {
      it('fails and does not create a new Organization', () => {
        return new Promise(async (resolve) => {
          const org = {
            email: 'test@mail.com',
            password: 'password',
          };

          const res = await chai.request(server)
            .post('/register/organization')
            .send(org);

          res.should.have.status(400);
          res.body.should.have.property('status').eql('Bad Request');
          res.body.should.have.property('messages');
          res.body.messages.should.contain('Path `name` is required.');
          resolve();
        });
      });
    });

    /**
     * Email validation
     */
    context('with a missing email address', () => {
      it('fails and does not create a new Organization', () => {
        return new Promise(async (resolve) => {
          const org = {
            name: 'Apple',
            password: 'password',
          };

          const res = await chai.request(server)
            .post('/register/organization')
            .send(org);

          res.should.have.status(400);
          res.body.should.have.property('status').eql('Bad Request');
          res.body.should.have.property('messages');
          res.body.messages.should.contain('Path `email` is required.');
          resolve();
        });
      });
    });

    context('with an invalid email address', () => {
      it('fails and does not create a new Organization', () => {
        return new Promise(async (resolve) => {
          const org = {
            name: 'Apple',
            email: 'Not an email',
            password: 'password',
          };

          const res = await chai.request(server)
            .post('/register/organization')
            .send(org);

          res.should.have.status(400);
          res.body.should.have.property('status').eql('Bad Request');
          res.body.should.have.property('messages');
          res.body.messages.should.contain('Not a valid email address.');
          resolve();
        });
      });
    });

    /**
     * Password validation
     */
    context('with a missing password', () => {
      it('fails and does not create a new Organization', () => {
        return new Promise(async (resolve) => {
          const org = {
            name: 'Apple',
            email: 'test@mail.com',
          };

          const res = await chai.request(server)
            .post('/register/organization')
            .send(org);

          res.should.have.status(400);
          res.body.should.have.property('status').eql('Bad Request');
          res.body.should.have.property('messages');
          res.body.messages.should.contain('Path `password` is required.');
          resolve();
        });
      });
    });

    context('with a password that is too short', () => {
      it('fails and does not create a new Organization', () => {
        return new Promise(async (resolve) => {
          const org = {
            name: 'Apple',
            email: 'test@mail.com',
            password: 'pass',
          };

          const res = await chai.request(server)
            .post('/register/organization')
            .send(org);

          res.should.have.status(400);
          res.body.should.have.property('status').eql('Bad Request');
          res.body.should.have.property('messages');
          res.body.messages.should.contain('Password is too short.');
          resolve();
        });
      });
    });
  });

  /**
   * Duplicate account check
   */
  context('when receiving a duplicate email address', () => {
    it('fails and does not create a duplicate account', () => {
      return new Promise(async (resolve) => {
        /** Create & save model we want attempt to duplicate */
        await new Organization({
          name: 'Apple',
          email: 'test@mail.com',
          password: 'password',
        }).save();

        /** Attempt to save a duplicate of `org` */
        const res = await chai.request(server)
          .post('/register/organization')
          .send({
            name: 'Google',
            email: 'test@mail.com',
            password: 'password',
          });

        res.should.have.status(400);
        res.body.should.have.property('status').eql('Bad Request');
        res.body.should.have.property('messages');
        res.body.messages.should.contain('An organization with that email already exists.');
        resolve();
      });
    });
  });
});
