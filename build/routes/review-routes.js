'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _reviewHandler = require('../controllers/reviewHandler');

var _middleware = require('../middlewares/middleware');

var _validateFunction = require('../validateFunction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewRouter = exports.reviewRouter = _express2.default.Router();

reviewRouter.post('/reviews', [_validateFunction.validateUserResource, _middleware.appMiddlewares.verifyToken, _reviewHandler.reviewHandler.createReview]).get('/reviews/:id', [_validateFunction.validateUserResource, _reviewHandler.reviewHandler.getBusinessReview]);
//# sourceMappingURL=review-routes.js.map