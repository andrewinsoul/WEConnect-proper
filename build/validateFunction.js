'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validator;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* @param {Object} request
*/
function validator(request) {
  var schema = void 0;
  if (Object.keys(request).includes('category')) {
    schema = {
      name: _joi2.default.string().required(),
      location: _joi2.default.string().required(),
      category: _joi2.default.string().required(),
      userId: _joi2.default.number().integer().required(),
      profile: _joi2.default.string().required()
    };
  } else if (Object.keys(request).includes('password1')) {
    schema = {
      name: _joi2.default.string().required(),
      email: _joi2.default.string().email().required(),
      password1: _joi2.default.string().required(),
      password2: _joi2.default.string().required(),
      username: _joi2.default.string().required()
    };
  } else if (Object.keys(request).length === 2 && Object.keys(request).includes('email') && Object.keys(request).includes('password')) {
    schema = {
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().required()
    };
  } else if (Object.keys(request).includes('review')) {
    schema = {
      review: _joi2.default.string().required(),
      email: _joi2.default.string().email().required(),
      username: _joi2.default.string().required(),
      businessId: _joi2.default.number().integer().required()
    };
  } else {
    return 'was not validated by joi...';
  }
  return _joi2.default.validate(request, schema);
}
//# sourceMappingURL=validateFunction.js.map