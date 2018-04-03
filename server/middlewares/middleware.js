import { users } from '../models/user';
import { businesses } from '../models/business';

export default class appMiddleware {
  static userSignupMiddleware(req, res, next) {
    next();
  }

  static userLoginMiddleware(req, res, next) {
    next();
  }

  static addBusinessMiddleware(req, res, next) {
    if (req.body.userId > users.length) return res.status(404).send({ error: 'user not found' });
    return next();
  }

  static removeBusinessMiddleware(req, res, next) {
    if (req.params.id > businesses.length) return res.status(404).send({ error: 'business not found' });
    return next();
  }
}
