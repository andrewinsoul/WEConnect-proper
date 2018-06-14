'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userHandler = require('../controllers/userHandler');

var _middleware = require('../middlewares/middleware');

var _validateFunction = require('../validateFunction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = exports.userRouter = _express2.default.Router();

userRouter.post('/signup', [_validateFunction.validateUserResource, _middleware.appMiddlewares.addUserMiddleware, _userHandler.userHandler.createUser]).post('/login', [_validateFunction.validateUserResource, _userHandler.userHandler.loginUser]);
//# sourceMappingURL=user-routes.js.map