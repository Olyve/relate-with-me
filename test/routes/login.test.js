/* eslint-disable no-console, arrow-body-style */
/** Import required components */
const {
  chai,
  server,
  Organization,
  jwt,
} = require('../test.config');

/** Clear database to make sure tests don't get polluted */
before(() => {
  return new Promise(async (resolve) => {
    await Organization.deleteMany({});
    resolve();
  });
});

/** Test Organization login */
describe('POST /login/organization', () => {
  context('when receiving a valid payload', () => {
    /** Create valid organization to test logging in */
    before(async () => {
      return new Promise(async (resolve) => {
        await new Organization({
          name: 'Apple',
          email: 'test@mail.com',
          password: 'password',
        }).save();
        resolve();
      });
    });

    it('logs in the Organization', () => {
      return new Promise(async (resolve, reject) => {
        const res = await chai.request(server)
          .post('/login/organization')
          .send({
            email: 'test@mail.com',
            password: 'password',
          });

        try {
          res.should.have.status(200);
          res.body.should.have.property('status', 'Success');
          res.body.should.have.property('messages');
          res.body.messages.should.contain('Organization logged in.');
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    /** Explicitly testing that returned JWT is valid, nothing else */
    it('returns a valid JWT token', () => {
      return new Promise(async (resolve, reject) => {
        const res = await chai.request(server)
          .post('/login/organization')
          .send({
            email: 'test@mail.com',
            password: 'password',
          });

        try {
          /** Check `data` contains correct payload */
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.token.should.be.a('string');

          /**
           * Test that the token in payload is a valid JWT token and that
           * the JWT payload contains the correct valid org_id.
           */
          const decoded = jwt.verify(res.body.data.token, process.env.SECRET);
          decoded.should.have.property('org_id');
          decoded.org_id.should.be.a('string');
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });
});
