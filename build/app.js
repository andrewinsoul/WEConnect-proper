'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _businessRoutes = require('./routes/business-routes');

var _reviewRoutes = require('./routes/review-routes');

var _userRoutes = require('./routes/user-routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = exports.app = (0, _express2.default)();
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use((0, _expressValidator2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/api/v1/auth', _userRoutes.userRouter);
app.use('/api/v1', _businessRoutes.businessRouter);
app.use('/api/v1', _reviewRoutes.reviewRouter);
//# sourceMappingURL=app.js.map