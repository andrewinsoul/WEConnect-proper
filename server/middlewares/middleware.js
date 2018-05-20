import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const key = process.env.JWT_SECRET_KEY;
/**
 * @class appMiddlewares
 */
export class appMiddlewares {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {JSON}
   */
  static verifyToken(req, res, next) {
    const myToken = req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!myToken) return res.status(403).send({ auth: false, msg: 'No token provided' });
    jwt.verify(
      myToken,
      key, (err, decoded) => {
        if (err) return res.status(401).send({ auth: false, msg: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
      },
    );
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {JSON}
   */
  static addUserMiddleware(req, res, next) {
    if (req.body.password1 !== req.body.password2) return res.status(409).send({ error: 'password mismatch' });
    return next();
  }
}
