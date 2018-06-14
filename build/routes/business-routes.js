'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.businessRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _businessHandler = require('../controllers/businessHandler');

var _middleware = require('../middlewares/middleware');

var _validateFunction = require('../validateFunction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var businessRouter = exports.businessRouter = _express2.default.Router();

businessRouter.post('/businesses', [_validateFunction.validateUserResource, _middleware.appMiddlewares.verifyToken, _businessHandler.businessHandler.createBusiness]).get('/businesses', [_middleware.appMiddlewares.verifyToken, _businessHandler.businessHandler.getAllBusinesses, _businessHandler.businessHandler.getBusinessesByCategory, _businessHandler.businessHandler.getBusinessesByLocation]);

businessRouter.delete('/businesses/:id', [_validateFunction.validateUserResource, _middleware.appMiddlewares.verifyToken, _businessHandler.businessHandler.deleteBusiness]).put('/businesses/:id', [_validateFunction.validateUserResource, _middleware.appMiddlewares.verifyToken, _businessHandler.businessHandler.updateBusinessProfile]).get('/businesses/:id', [_validateFunction.validateUserResource, _middleware.appMiddlewares.verifyToken, _businessHandler.businessHandler.getOneBusiness]);
//# sourceMappingURL=business-routes.js.map