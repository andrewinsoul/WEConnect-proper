'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appMiddlewares = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.load();
var key = process.env.JWT_SECRET_KEY;
/**
 * @class appMiddlewares
 */

var appMiddlewares = exports.appMiddlewares = function () {
  function appMiddlewares() {
    _classCallCheck(this, appMiddlewares);
  }

  _createClass(appMiddlewares, null, [{
    key: 'verifyToken',

    /**
     *
     * @param {object} req
     * @param {object} res
     * @param {Function} next
     * @returns {JSON}
     */
    value: function verifyToken(req, res, next) {
      var myToken = req.headers['x-access-token'] || req.query.token || req.body.token;
      if (!myToken) return res.status(403).send({ auth: false, error: 'No token provided' });
      _jsonwebtoken2.default.verify(myToken, key, function (err, decoded) {
        if (err) return res.status(401).send({ auth: false, error: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
      });
    }

    /**
     *
     * @param {object} req
     * @param {object} res
     * @param {Function} next
     * @returns {JSON}
     */

  }, {
    key: 'addUserMiddleware',
    value: function addUserMiddleware(req, res, next) {
      if (req.body.password1 !== req.body.password2) return res.status(409).send({ error: 'password mismatch' });
      return next();
    }
  }]);

  return appMiddlewares;
}();
//# sourceMappingURL=middleware.js.map