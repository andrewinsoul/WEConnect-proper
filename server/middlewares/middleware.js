import { users } from '../models/user';
import { businesses } from '../models/business';
import validator from '../validateFunction';
import { reviews } from '../models/review';

export class appMiddleware {
  static userSignupMiddleware(req, res, next) {
    const { error } = validator(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    if (req.body.password1 !== req.body.password2) return res.status(406).send({ error: 'password mismatch' });
    const email = users.find(item => item.email === req.body.email);
    const username = users.find(item => item.username === req.body.username);
    if (email) return res.status(409).send({ error: 'user with this email already has an account' });
    if (username) return res.status(409).send({ error: 'username already taken, choose another one' });
    return next();
  }

  static userLoginMiddleware(req, res, next) {
    if (!Object.keys(req.body).includes('email')) return res.status(400).send({ error: 'email is required' });
    if (!Object.keys(req.body).includes('password')) return res.status(400).send({ error: 'password is required' });
    const { error } = validator(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    return next();
  }

  static addBusinessMiddleware(req, res, next) {
    const { error } = validator(req.body);
    const business = businesses.find(item => item.name === req.body.name);
    if (error) return res.status(400).send({ error: error.details[0].message });
    if (req.body.userId > users.length) return res.status(404).send({ error: 'user not found' });
    if (business) return res.status(409).send({ error: 'name of business already taken' });
    return next();
  }

  static removeBusinessMiddleware(req, res, next) {
    if (req.params.id > businesses.length) return res.status(404).send({ error: 'business not found' });
    return next();
  }

  static getAllBusinessMiddleware(req, res, next) {
    if (Object.keys(req.query).length) {
      return next();
    }
    return res.status(200).send({ msg: businesses });
  }

  static businessByCategoryMiddleware(req, res, next) {
    if (!Object.keys(req.query).includes('category')) {
      return next();
    }
    const businessWithCategory = businesses.filter(item => item.category === req.query.category);
    if (businessWithCategory.length) return res.status(200).send({ msg: businessWithCategory });
    return res.status(404).send({ error: 'businesses with category not found' });
  }

  static getBusinessByIdMiddleware(req, res, next) {
    const business = businesses.find(item => item.id === Number(req.params.id));
    if (!business) return res.status(404).send({ error: 'business not found' });
    return next();
  }

  static businessByLocationMiddleware(req, res, next) {
    if (!Object.keys(req.query).includes('location')) return res.status(400).send({ error: 'bad request' });
    const businessWithLocation = businesses.filter(item => item.location === req.query.location);
    if (businessWithLocation.length) return res.status(200).send({ msg: businessWithLocation });
    return res.status(404).send({ error: 'businesses with location not found' });
  }

  static addBusinessReviewMiddleware(req, res, next) {
    if (req.body.businessId > businesses.length) return res.status(404).send({ error: 'business not found' });
    const { error } = validator(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    return next();
  }

  static getBusinessReviewMiddleware(req, res, next) {
    if (Number(req.params.id) > businesses.length) return res.status(404).send({ error: 'business not found' });
    const businessReview = reviews.filter(item => item.businessId === Number(req.params.id));
    if (!businessReview.length) return res.status(200).send({ msg: 'No review yet for business' });
    return next();
  }
}
