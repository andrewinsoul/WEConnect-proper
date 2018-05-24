import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server/app';

chai.use(chaiHttp);
const server = chai.request(app);
const { expect } = chai;
let validToken;

describe('WEconnect API testing for the review model', () => {
  describe('log in with accurate credentials to get token', () => {
    it('should return token that will be use to access other authenticated routes', (done) => {
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

  describe('tests for adding a review about a business', () => {
    it('should return status 201 with message review successfully posted', (done) => {
      server
        .post('/api/v1/reviews')
        .send({
          email: 'andrewinsoul@gmail.com',
          username: 'andy',
          review: 'more work is needed',
          businessId: 1,
          token: validToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('review successfully posted');
          done();
        });
    });
  });

  describe('tests for getting reviews about a business', () => {
    it('should return all reviews about a particular business', (done) => {
      server
        .get('/api/v1/reviews/1')
        .send({
          token: validToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg[0].review).to.eql('more work is needed');
          expect(res.body.msg[0].email).to.eql('andrewinsoul@gmail.com');
          done();
        });
    });

    it('should return error code with message business not found', (done) => {
      server
        .get('/api/v1/reviews/2')
        .send({
          token: validToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('not found');
          done();
        });
    });

    it('should return error code with message no review for business', (done) => {
      server
        .get('/api/v1/reviews/3')
        .send({
          token: validToken,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql('not found');
          done();
        });
    });
  });
});
