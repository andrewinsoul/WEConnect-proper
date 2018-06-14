'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userHandler = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var User = _index.db.User;

var key = process.env.JWT_SECRET_KEY;

var userHandler = exports.userHandler = {
  createUser: function createUser(req, res) {
    var encodedPassword = _bcryptjs2.default.hashSync(req.body.password1, 8);
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: encodedPassword,
      username: req.body.username
    }).then(function (user) {
      var myToken = _jsonwebtoken2.default.sign({
        id: user.id
      }, key, {
        expiresIn: 86400
      });
      return res.status(201).send({ auth: true, token: myToken });
    }).catch(function (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        if (error.errors[0].message.includes('username')) return res.status(409).send({ error: 'username already taken' });
        return res.status(409).send({ error: 'email already exists' });
      }
    });
  },
  loginUser: function loginUser(req, res) {
    return User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      if (!user) return res.status(401).send({ error: 'Authentication failed, user not found' });
      var isPasswordValid = _bcryptjs2.default.compareSync(req.body.password, user.password);
      if (!isPasswordValid) return res.status(401).send({ auth: false, token: null, msg: 'incorrect password' });
      var myToken = _jsonwebtoken2.default.sign({
        id: user.id
      }, key, {
        expiresIn: 86400
      });
      return res.status(200).send({ auth: true, token: myToken });
    });
    // .catch(error => res.status(500).send({ error }));
  }
};
//# sourceMappingURL=userHandler.js.map