import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server/app';

chai.use(chaiHttp);
const server = chai.request(app);
const { expect } = chai;

describe('WEconnect API testing-user', () => {
  describe('tests for WEConnect User pg model', () => {
    it('should return error with status code indicating conflict', (done) => {
      server
        .post('/api/v1/auth/signup')
        .send({
          name: 'Veronica Okoye',
          email: 'azuka67@gmail.com',
          password1: 'chinecherem',
          password2: 'sweetmothers',
          username: 'andy',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error);
          done();
        });
    });

    it('should return token', (done) => {
      server
        .post('/api/v1/auth/signup')
        .send({
          name: 'Veronica Okoye',
          email: 'azuka60@gmail.com',
          password1: 'chinecherem',
          password2: 'chinecherem',
          username: 'vera',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should return status code 400 with error message invalid credentials supplied', (done) => {
      server
        .post('/api/v1/auth/login')
        .send({
          email: 'azuka60@gmail.com',
          password: 'wrongPassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('auth');
          expect(res.body.auth).to.eql(false);
          done();
        });
    });
  });
});
