/**
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {object}
 */
export function validateUserResource(req, res, next) {
  if (req.url === '/signup') {
    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('email', 'email is required and should be valid').notEmpty().isEmail();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password1', 'password is required').notEmpty();
    req.checkBody('password2', 'password is required').notEmpty();
  }
  else if (req.url === '/login') {
    req.checkBody('email', 'email is required and should be valid').notEmpty().isEmail();
    req.checkBody('password', 'password is required').notEmpty();
  }
  else if (req.url === '/businesses' && req.method === 'POST') {
    req.checkBody('userId', 'userId is required and should be an integer').notEmpty().isInt();
  }
  else if (req.url === '/reviews' && req.method === 'POST') {
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('email', 'a valid email address is required').notEmpty().isEmail();
    req.checkBody('businessId', 'businessId required and should be an integer').notEmpty().isInt();
    req.checkBody('review', 'review is required').notEmpty();
  }
  else if (req.method === 'GET') {
    req.checkParams('id', 'Must be valid').notEmpty().isInt();
  }
  else if (req.method === 'PUT') {
    req.checkParams('id', 'Must be valid').notEmpty().isInt();
    req.checkBody('profile', 'profile is required').notEmpty();
  }
  const error = req.validationErrors();
  if (error) return res.status(400).send({ message: 'validation failed', failures: error });
  return next();
}
