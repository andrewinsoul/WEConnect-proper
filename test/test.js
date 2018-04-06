import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { appMiddleware } from "../server/middlewares/middleware";
import userHandler from "../server/controllers/userController";
import businessHandler from "../server/controllers/businessController";
import reviewHandler from "../server/controllers/reviewController";
import { users } from "../server/models/user";
import { businesses } from "../server/models/business";
import { reviews } from "../server/models/review";
import validator from "../server/validateFunction";

chai.use(chaiHttp);
const { expect } = chai;
const server = chai.request(app);

describe('WEConnect dummy-data backend tests', () => {
  describe('tests for user-signup-middleware', () => {
    it('should return code 400 with message name is required', (done) => {
      server
        .post('/api/v1/auth/signup')
        .send({
          username: 'lovergal',
          email: 'loveth33@hotmail.com',
          password1: 'andela',
          password2: 'andela',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('"name" is required');
          done();
        });
    });

    it('should return code 406 with message password mismatch', (done) => {
      server
        .post('/api/v1/auth/signup')
        .send({
          name: 'Loveth',
          username: 'lovergal',
          email: 'loveth33@hotmail.com',
          password1: 'andela',
          password2: 'andela1',
        })
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('password mismatch');
          done();
        });
    });

    it('should return code 409 with message user with email already exists', (done) => {
      server
        .post('/api/v1/auth/signup')
        .send({
          name: 'Loveth',
          username: 'lovergal',
          email: 'andy@gmail.com',
          password1: 'andela',
          password2: 'andela',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('user with this email already has an account');
          done();
        });
    });

    it('should return code 409 with message username already taken', (done) => {
      server
        .post('/api/v1/auth/signup')
        .send({
          name: 'Loveth',
          username: 'andy',
          email: 'andy3@gmail.com',
          password1: 'andela',
          password2: 'andela',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('username already taken, choose another one');
          done();
        });
    });
  });


  describe('test for userController that adds a user', () => {
    it('should return code 201 with object of user just added', (done) => {
      server
        .post('/api/v1/auth/signup')
        .send({
          name: 'Loveth',
          username: 'love666',
          email: 'love3@gmail.com',
          password1: 'andela',
          password2: 'andela',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql({
            id: users.length,
            name: 'Loveth',
            email: 'love3@gmail.com',
            password: 'andela',
            username: 'love666',
          });
          done();
        });
    });
  });


  describe('tests for user-login-middleware', () => {
    it('should return code 400 with a short error message', (done) => {
      server
        .post('/api/v1/auth/login')
        .send({
          email: 'aaa@gmil.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('password is required');
          done();
        });
    });

    it('should return code 400 with a short error message', (done) => {
      server
        .post('/api/v1/auth/login')
        .send({
          password: 'andela',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('email is required');
          done();
        });
    });

    it('should return code 400 with a short error message', (done) => {
      server
        .post('/api/v1/auth/login')
        .send({
          email: 'aaagmil.com',
          password: 'andela',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('"email" must be a valid email');
          done();
        });
    });

    it('should return code 401 with a short error message', (done) => {
      server
        .post('/api/v1/auth/login')
        .send({
          email: 'wrongmail@gmail.com',
          password: 'wrongPassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('wrong email or password entered');
          done();
        });
    });
  });


  describe('test for user-login controller', () => {
    it('should return 200 with message user successfully logged in', (done) => {
      server
        .post('/api/v1/auth/login')
        .send({
          email: 'andy@gmail.com',
          password: 'sweetmother',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('Andrew Okoye logged in');
          done();
        });
    });
  });


  describe('test for addBusiness-middleware', () => {
    it('should return 400 with a short error message for incomplete keys', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'GUO group of transports',
          location: 'Lagos',
          category: 'Transports',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('"userId" is required');
          done();
        });
    });

    it('should return 409 with a short error message for business name conflict', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'Oko Farm',
          location: 'Lagos',
          category: 'Transports',
          userId: 3,
          profile: 'Amazingly great tech employed to serve you better',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('name of business already taken');
          done();
        });
    });

    it('should return 404 with a short error message when userId is not found', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'GUO group of transports',
          location: 'Lagos',
          category: 'Transports',
          userId: 6,
          profile: 'while travelling, your safety is our priority',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('user not found');
          done();
        });
    });
  });


  describe('test for addBusiness controller', () => {
    it('should return code 200 and a msg with business object just added', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'GUO group of transports',
          location: 'Lagos',
          category: 'Transports',
          userId: 2,
          profile: 'while travelling, your safety is our priority',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql({
            id: businesses.length,
            name: 'GUO group of transports',
            location: 'Lagos',
            category: 'Transports',
            userId: 2,
            profile: 'while travelling, your safety is our priority',
          });
          done();
        });
    });
  });


  describe('test for removeBusiness-middleware', () => {
    it('should return error code 404 when with short error message business not found', (done) => {
      server
        .del('/api/v1/businesses/6')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business not found');
          done();
        });
    });
  });


  describe('test for removeBusiness controller', () => {
    it('should return error code 200 when with object of business deleted', (done) => {
      server
        .del('/api/v1/businesses/4')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql({
            id: 4,
            name: 'GUO group of transports',
            location: 'Lagos',
            category: 'Transports',
            userId: 2,
            profile: 'while travelling, your safety is our priority',
          });
          done();
        });
    });
  });


  describe('test for getBusinessById-middleware', () => {
    it('should return status code 404 with error message business not found for inappropriate param value', (done) => {
      server
        .get('/api/v1/businesses/4')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business not found');
          done();
        });
    });
  });


  describe('test for getBusinessById controller', () => {
    it('should return status code 200 with an object of requested business', (done) => {
      server
        .get('/api/v1/businesses/1')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql({
            id: 1,
            name: "Shoe Company",
            location: "Abuja",
            category: "production",
            userId: 1,
            profile: "good shoes @ good prices",
          });
          done();
        });
    });
  });


  describe('test for updateBusinessProfile controller', () => {
    it('should return code 200', (done) => {
      server
        .put('/api/v1/businesses/1')
        .send({ profile: 'keep on believing...' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql({
            id: 1,
            name: "Shoe Company",
            location: "Abuja",
            category: "production",
            userId: 1,
            profile: "keep on believing...",
          });
          done();
        });
    });
  });


  describe('test for getting all businesses', () => {
    it('should return code 200 with object of all businesses in dummy database', (done) => {
      server
        .get('/api/v1/businesses')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql([
            {
              id: 1,
              name: "Shoe Company",
              location: "Abuja",
              category: "production",
              userId: 1,
              profile: "keep on believing...",
            },
            {
              id: 2,
              name: "Oko Farm",
              location: "Kano",
              category: "farming",
              userId: 3,
              profile: "providing the nation food",
            },
            {
              id: 3,
              name: "Oko Transport",
              location: "Lagos",
              category: "transportation",
              userId: 3,
              profile: "moving people around",
            },
          ]);
          done();
        });
    });
  });


  describe('positive test for querying all businesses by category', () => {
    it('should return code 200 with object of businesses that has the queried category', (done) => {
      server
        .get('/api/v1/businesses?category=farming')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql([
            {
              id: 2,
              name: "Oko Farm",
              location: "Kano",
              category: "farming",
              userId: 3,
              profile: "providing the nation food",
            },
          ]);
          done();
        });
    });
  });


  describe('negative test for querying all businesses by category', () => {
    it('should return code 404 with error message business not found', (done) => {
      server
        .get('/api/v1/businesses?category=impossibleCategory')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('businesses with category not found');
          done();
        });
    });
  });


  describe('test for querying all businesses by location', () => {
    it('should return code 200 with object of businesses that has the queried location', (done) => {
      server
        .get('/api/v1/businesses?location=Lagos')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql([
            {
              id: 3,
              name: "Oko Transport",
              location: "Lagos",
              category: "transportation",
              userId: 3,
              profile: "moving people around",
            },
          ]);
          done();
        });
    });
  });


  describe('negative test for querying all businesses by location', () => {
    it('should return code 404 with error message business not found', (done) => {
      server
        .get('/api/v1/businesses?location=Bermuda')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('businesses with location not found');
          done();
        });
    });
  });


  describe('negative test for querying all businesses', () => {
    it('should return code 400 with error message bad request', (done) => {
      server
        .get('/api/v1/businesses?who_asked_you=impossibleCategory')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('bad request');
          done();
        });
    });
  });


  describe('test for addBusinessReview-middleware', () => {
    it('should return code 404 with error message business not found', (done) => {
      server
        .post('/api/v1/businesses/reviews')
        .send({
          id: 4,
          businessId: 5,
          review: 'more grace to your elbow',
          username: 'andy',
          email: 'andrewinsoul@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business not found');
          done();
        });
    });

    it('should return status code 400 with short error message', (done) => {
      server
        .post('/api/v1/businesses/reviews')
        .send({
          id: 4,
          review: 'more grace to your elbow',
          username: 'andy',
          email: 'andrewinsoul@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('"businessId" is required');
          done();
        });
    });
  });


  describe('test for addBusinessReview controller', () => {
    it('should return status code 201 with object of business review just added', (done) => {
      server
        .post('/api/v1/businesses/reviews')
        .send({
          businessId: 1,
          review: 'more work needs to be done on your delivery team',
          username: 'andrew',
          email: 'andrewinsoul@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql({
            id: reviews.length,
            businessId: 1,
            review: 'more work needs to be done on your delivery team',
            username: 'andrew',
            email: 'andrewinsoul@gmail.com',
          });
          expect(reviews.length).to.eql(4);
          done();
        });
    });
  });


  describe('test for getBusinessReview-middleware', () => {
    it('should return code 404 with error message business not found', (done) => {
      server
        .get('/api/v1/businesses/reviews/6')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business not found');
          done();
        });
    });

    it('should return code 200 with  message no review yet for business', (done) => {
      server
        .get('/api/v1/businesses/reviews/3')
        .send({ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('No review yet for business');
          done();
        });
    });
  });


  describe('tests for validator function', () => {
    it('should return validation error for request body without profile', (done) => {
      const schema = {
        name: 'Andy',
        location: 'Seychelles',
        category: 'software development',
        userId: 5,
      };
      const result = validator(schema);
      chai.assert.strictEqual(typeof (result), 'object');
      chai.assert.strictEqual(result.error.details[0].message, '"profile" is required');
      done();
    });

    it('should return validation error for request body with invalid email', (done) => {
      const schema = {
        name: 'SlickFems',
        email: 'invalidemail111',
        password1: 'however',
        password2: 'whatever',
        username: 'andy',
      };
      const result = validator(schema);
      chai.assert.strictEqual(typeof (result), 'object');
      chai.assert.strictEqual(result.error.details[0].message, '"email" must be a valid email');
      done();
    });

    it('should return validation error for request body with numerical characters for password', (done) => {
      const schema = {
        email: 'andrewinsoul@yahoo.com',
        password: 65567,
      };
      const result = validator(schema);
      chai.assert.strictEqual(typeof (result), 'object');
      chai.assert.strictEqual(result.error.details[0].message, '"password" must be a string');
      done();
    });

    it('should return validation error for request body with numerical characters for password', (done) => {
      const schema = {
        review: 'you can still go higher..',
        email: 'andrewinsoul@gmail.com',
        username: 'odk',
        businessId: 'invalid character',
      };
      const result = validator(schema);
      chai.assert.strictEqual(typeof (result), 'object');
      chai.assert.strictEqual(result.error.details[0].message, '"businessId" must be a number');
      done();
    });

    it('should return validation error for request body with numerical characters for password', (done) => {
      const schema = {
        email: 'andrewinsoul@gmail.com',
        username: 'odk',
        businessId: 'invalid character',
      };
      const result = validator(schema);
      chai.assert.strictEqual(typeof (result), 'string');
      chai.assert.strictEqual(result, 'was not validated by joi...');
      done();
    });
  });
});
