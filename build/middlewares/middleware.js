'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appMiddleware = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../models/user');

var _business = require('../models/business');

var _validateFunction = require('../validateFunction');

var _validateFunction2 = _interopRequireDefault(_validateFunction);

var _review = require('../models/review');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appMiddleware = exports.appMiddleware = function () {
  function appMiddleware() {
    _classCallCheck(this, appMiddleware);
  }

  _createClass(appMiddleware, null, [{
    key: 'userSignupMiddleware',
    value: function userSignupMiddleware(req, res, next) {
      var _validator = (0, _validateFunction2.default)(req.body),
          error = _validator.error;

      if (error) return res.status(400).send({ error: error.details[0].message });
      if (req.body.password1 !== req.body.password2) return res.status(406).send({ error: 'password mismatch' });
      var email = _user.users.find(function (item) {
        return item.email === req.body.email;
      });
      var username = _user.users.find(function (item) {
        return item.username === req.body.username;
      });
      if (email) return res.status(409).send({ error: 'user with this email already has an account' });
      if (username) return res.status(409).send({ error: 'username already taken, choose another one' });
      return next();
    }
  }, {
    key: 'userLoginMiddleware',
    value: function userLoginMiddleware(req, res, next) {
      if (!Object.keys(req.body).includes('email')) return res.status(400).send({ error: 'email is required' });
      if (!Object.keys(req.body).includes('password')) return res.status(400).send({ error: 'password is required' });

      var _validator2 = (0, _validateFunction2.default)(req.body),
          error = _validator2.error;

      if (error) return res.status(400).send({ error: error.details[0].message });
      return next();
    }
  }, {
    key: 'addBusinessMiddleware',
    value: function addBusinessMiddleware(req, res, next) {
      var _validator3 = (0, _validateFunction2.default)(req.body),
          error = _validator3.error;

      var business = _business.businesses.find(function (item) {
        return item.name === req.body.name;
      });
      if (error) return res.status(400).send({ error: error.details[0].message });
      if (req.body.userId > _user.users.length) return res.status(404).send({ error: 'user not found' });
      if (business) return res.status(409).send({ error: 'name of business already taken' });
      return next();
    }
  }, {
    key: 'removeBusinessMiddleware',
    value: function removeBusinessMiddleware(req, res, next) {
      var businessIndex = _business.businesses.findIndex(function (index) {
        return index.id === Number(req.params.id);
      });
      if (businessIndex === -1) return res.status(404).send({ error: 'business not found' });
      return next();
    }
  }, {
    key: 'getAllBusinessMiddleware',
    value: function getAllBusinessMiddleware(req, res, next) {
      if (Object.keys(req.query).length) {
        return next();
      }
      return res.status(200).send({ msg: _business.businesses });
    }
  }, {
    key: 'businessByCategoryMiddleware',
    value: function businessByCategoryMiddleware(req, res, next) {
      if (!Object.keys(req.query).includes('category')) {
        return next();
      }
      var businessWithCategory = _business.businesses.filter(function (item) {
        return item.category === req.query.category;
      });
      if (businessWithCategory.length) return res.status(200).send({ msg: businessWithCategory });
      return res.status(404).send({ error: 'businesses with category not found' });
    }
  }, {
    key: 'getBusinessByIdMiddleware',
    value: function getBusinessByIdMiddleware(req, res, next) {
      var business = _business.businesses.find(function (item) {
        return item.id === Number(req.params.id);
      });
      if (!business) return res.status(404).send({ error: 'business not found' });
      return next();
    }
  }, {
    key: 'businessByLocationMiddleware',
    value: function businessByLocationMiddleware(req, res, next) {
      if (!Object.keys(req.query).includes('location')) return res.status(400).send({ error: 'bad request' });
      var businessWithLocation = _business.businesses.filter(function (item) {
        return item.location === req.query.location;
      });
      if (businessWithLocation.length) return res.status(200).send({ msg: businessWithLocation });
      return res.status(404).send({ error: 'businesses with location not found' });
    }
  }, {
    key: 'addBusinessReviewMiddleware',
    value: function addBusinessReviewMiddleware(req, res, next) {
      if (req.body.businessId > _business.businesses.length) return res.status(404).send({ error: 'business not found' });

      var _validator4 = (0, _validateFunction2.default)(req.body),
          error = _validator4.error;

      if (error) return res.status(400).send({ error: error.details[0].message });
      return next();
    }
  }, {
    key: 'getBusinessReviewMiddleware',
    value: function getBusinessReviewMiddleware(req, res, next) {
      if (Number(req.params.id) > _business.businesses.length) return res.status(404).send({ error: 'business not found' });
      var businessReview = _review.reviews.filter(function (item) {
        return item.businessId === Number(req.params.id);
      });
      if (!businessReview.length) return res.status(200).send({ msg: 'No review yet for business' });
      return next();
    }
  }]);

  return appMiddleware;
}();
//# sourceMappingURL=middleware.js.map