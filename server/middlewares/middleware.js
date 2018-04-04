import Joi from 'joi';
import { users } from '../models/user';
import { businesses } from '../models/business';

export class appMiddleware {
  static userSignupMiddleware(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password1: Joi.string().required(),
      password2: Joi.string().required(),
      username: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    if (req.body.password1 !== req.body.password2) return res.status(406).send({ error: 'password mismatch' });
    const email = users.find(item => item.email === req.body.email);
    const username = users.find(item => item.username === req.body.username);
    if (email) return res.status(409).send({ error: 'user with this email already has an account' });
    if (username) return res.status(409).send({ error: 'username already taken, choose another one' });
    return next();
  }

  static userLoginMiddleware(req, res, next) {
    const schema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    return next();
  }

  static addBusinessMiddleware(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      location: Joi.string().required(),
      category: Joi.string().required(),
      userId: Joi.string().required(),
      profile: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    if (req.body.userId > users.length) return res.status(404).send({ error: 'user not found' });
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
    if (businessWithCategory) return res.status(200).send({ msg: businessWithCategory });
    return res.status(404).send({ error: 'business with category not found' });
  }

  static businessByLocationMiddleware(req, res, next) {
    if (!Object.keys(req.query).includes('location')) return res.status(400).send({ error: 'bad request' });
    const businessWithLocation = businesses.filter(item => item.location === req.query.location);
    if (businessWithLocation) return res.status(200).send({ msg: businessWithLocation });
    return res.status(404).send({ error: 'business with location not found' });
  }

  static addBusinessReviewMiddleware(req, res, next) {
    const schema = {
      review: Joi.string().required(),
      email: Joi.string().required(),
      username: Joi.string().required(),
      businessId: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    return next();
  }
}
