'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _business = require('../models/business');

var _review = require('../models/review');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var businessHandler = function () {
  function businessHandler() {
    _classCallCheck(this, businessHandler);
  }

  _createClass(businessHandler, null, [{
    key: 'addBusiness',
    value: function addBusiness(req, res) {
      var businessInfo = {
        id: _business.businesses.length += 1,
        name: req.body.name,
        location: req.body.location,
        category: req.body.category,
        userId: req.body.userId,
        profile: req.body.profile
      };
      _business.businesses.push(businessInfo);
      // same reason as stated out in the user controller module.
      _business.businesses.splice(_business.businesses.length - 2, 1);
      return res.status(201).send({ msg: businessInfo });
    }
  }, {
    key: 'updateProfile',
    value: function updateProfile(req, res) {
      var index = _business.businesses.findIndex(function (item) {
        return item.id === Number(req.params.id);
      });
      _business.businesses[index].profile = req.body.profile;
      return res.status(200).send({ msg: _business.businesses[index] });
    }
  }, {
    key: 'removeBusiness',
    value: function removeBusiness(req, res) {
      var index = _business.businesses.findIndex(function (item) {
        return item.id === Number(req.params.id);
      });
      var business = _business.businesses[index];
      _business.businesses.splice(index, 1);
      return res.status(200).send({ msg: business });
    }
  }, {
    key: 'getBusinessById',
    value: function getBusinessById(req, res) {
      var business = _business.businesses.find(function (item) {
        return item.id === Number(req.params.id);
      });
      return res.status(200).send({ msg: business });
    }
  }]);

  return businessHandler;
}();

exports.default = businessHandler;
//# sourceMappingURL=businessController.js.map