'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _review = require('../models/review');

var _business = require('../models/business');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var reviewHandler = function () {
  function reviewHandler() {
    _classCallCheck(this, reviewHandler);
  }

  _createClass(reviewHandler, null, [{
    key: 'addReview',
    value: function addReview(req, res) {
      var reviewInfo = {
        id: _review.reviews.length += 1,
        businessId: req.body.businessId,
        review: req.body.review,
        username: req.body.username,
        email: req.body.email
      };
      _review.reviews.push(reviewInfo);
      // same reason as stated out in the userController module.
      _review.reviews.splice(_review.reviews.length - 2, 1);
      return res.status(201).send({ msg: reviewInfo });
    }
  }, {
    key: 'getBusinessReview',
    value: function getBusinessReview(req, res) {
      var businessReview = _review.reviews.filter(function (item) {
        return item.businessId === Number(req.params.id);
      });
      return res.status(200).send({ msg: businessReview });
    }
  }]);

  return reviewHandler;
}();

exports.default = reviewHandler;