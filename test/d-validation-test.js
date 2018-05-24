import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server/app';

chai.use(chaiHttp);
const server = chai.request(app);
const { expect } = chai;

describe('WEconnect API testing input validation', () => {
  describe('tests for WEConnect User input', () => {
    it('should return error message name is required', (done) => {
      server
        .post('/api/v1/auth/signup')
        .send({
          email: 'azuka66@gmail.com',
          password1: 'sweetmothers',
          password2: 'sweetmothers',
          username: 'andycode',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.failures[0].msg).to.eql('name is required');
        });
      server
        .post('/api/v1/auth/signup')
        .send({
          name: 'Azuka Okoye',
          password1: 'chinecherem',
          password2: 'chinecherem',
          username: 'andyerlang',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.failures[0].msg).to.eql('email is required and should be valid');
          done();
        });
    });

    it('should return error message with status code 400', (done) => {
      server
        .post('/api/v1/auth/login')
        .send({
          email: 'azuka60gmail.com',
          password: 'chinecherem',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.failures[0].msg).to.eql('email is required and should be valid');
          done();
        });
    });

    it('should return status code 400 with error message userId is required and should be an integer', (done) => {
      server
        .post('/api/v1/businesses')
        .send({
          name: 'azuka60 enterpreise',
          location: 'Lagos',
          category: 'Sports',
          profile: 'pushing forward',
          userId: [],
          address: 'Jones Street, Lagos',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.failures[0].msg).to.eql('userId is required and should be an integer');
          done();
        });
    });

    it('should return status code 400 with error message userId is required and should be an integer', (done) => {
      server
        .post('/api/v1/reviews')
        .send({
          email: 'andrewinsoul@gmail.com',
          businessId: 2,
          username: 'andy',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('failures');
          expect(res.body.failures[0].msg).to.eql('review is required');
          done();
        });
    });
  });
});
