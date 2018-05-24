import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server/app';

chai.use(chaiHttp);
const server = chai.request(app);
const { expect } = chai;
let validToken;

describe('WEconnect API testing for the business model', () => {
  describe('log in with accurate credentials to get token', () => {
    it('should return token which will be used in subsequent tests', (done) => {
      server
        .post('/api/v1/auth/login')
        .send({
          email: 'azuka60@gmail.com',
          password: 'chinecherem',
        })
        .end((err, res) => {
          validToken = res.body.token;
          done();
        });
    });
  });

  describe('tests for adding a business', () => {
    it('should return status code 201 with message business was succesfully created', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'Andy Sports Ground',
          address: '999 Ibrahim-Taiwo Road, Bompai',
          location: 'Kano',
          category: 'Sports',
          profile: 'keeping your physique sharp',
          token: validToken,
          userId: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('name');
          expect(res.body.name).to.eql('Andy Sports Ground');
        });

      server
        .post('/api/v1/businesses')
        .send({
          name: 'Andy Sports Arena',
          address: '999 Ibrahim-Taiwo Road, Bompai',
          location: 'Kano',
          category: 'Sports',
          profile: 'keeping you as fit as a fiddle',
          token: validToken,
          userId: 1,
        })
        .end();

      server
        .post('/api/v1/businesses')
        .send({
          name: 'Andy Coding Center',
          address: '999 Oxford Street',
          location: 'London',
          category: 'Sports',
          profile: 'helping passionate coders achieve thier dreams',
          token: validToken,
          userId: 1,
        })
        .end(() => done());
    });

    it('should return error with status code 409 with error message business name already exists', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'Andy Sports Ground',
          address: '999c Illupeju Road, Ikorodu',
          location: 'Lagos',
          category: 'Sports',
          profile: 'unbelievably amazing...',
          token: validToken,
          userId: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business name already exists');
          done();
        });
    });

    it('should status code 404 with error message business profile already exists', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'Andela-python',
          address: '999c Illupeju Road, Ikorodu',
          location: 'Lagos',
          category: 'Sports',
          profile: 'keeping your physique sharp',
          token: validToken,
          userId: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business profile already exists');
          done();
        });
    });

    it('should return error with status code 404 with error message user not found', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'Andela-javascript',
          address: '999c Illupeju Road, Ikorodu',
          location: 'Lagos',
          category: 'Sports',
          profile: 'unbelievably crazy',
          token: validToken,
          userId: 12,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('User not found');
          done();
        });
    });
  });

  describe('tests for deleting a business', () => {
    it('should return status code of 200 with message business was succesfully deleted', (done) => {
      server
        .del('/api/v1/businesses/2')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('Business successfully deleted');
          done();
        });
    });

    it('should return status code 404 with error message business not found', (done) => {
      server
        .del('/api/v1/businesses/2')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business not found');
          done();
        });
    });
  });

  describe('tests for getting a business', () => {
    it('should return status code 404 with error message business not found', (done) => {
      server
        .get('/api/v1/businesses/2')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business not found');
          done();
        });
    });

    it('should return status code 200 with business', (done) => {
      server
        .get('/api/v1/businesses/1')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg.name).to.eql('Andy Sports Ground');
          done();
        });
    });
  });

  describe('tests for getting businesses', () => {
    it('should return status code 200 with array of businesses', (done) => {
      server
        .get('/api/v1/businesses')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg.length).to.eql(2);
          // how to check type of objects in javascript;
          done();
        });
    });

    it('should return 200 with array of businesses with categories specified in the query', (done) => {
      server
        .get('/api/v1/businesses?category=Sports')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg[0].category).to.eql('Sports');
          done();
        });
    });

    it('should return 200 with array of businesses with location specified in the query', (done) => {
      server
        .get('/api/v1/businesses?location=Kano')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg[0].location).to.eql('Kano');
          done();
        });
    });

    it('should return code 404 with error message business with location not found', (done) => {
      server
        .get('/api/v1/businesses?location=Bermuda Triangle')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business with location not found');
          done();
        });
    });

    it('should return code 404 with error message business with category not found', (done) => {
      server
        .get('/api/v1/businesses?category=Fashion')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business with category not found');
          done();
        });
    });

    it('should return code 400 with error message bad request for a bad query string', (done) => {
      server
        .get('/api/v1/businesses?search=Fashion')
        .send({ token: validToken })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('Bad Request');
          done();
        });
    });
  });

  describe('tests for updating business profile', () => {
    it('should return status 200 with message business profile successfully updated', (done) => {
      server
        .put('/api/v1/businesses/1')
        .send({
          token: validToken,
          profile: 'keeping the customer\'s comfort at heart',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('profile succesfully updated');
          done();
        });
    });

    it('should return status 404 with message business not found', (done) => {
      server
        .put('/api/v1/businesses/2')
        .send({
          token: validToken,
          profile: 'keeping the customer\'s comfort at heart',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('business not found');
          done();
        });
    });
  });
});
