/*eslint-disable */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _route = require('./routes/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var swaggerDocument = _yamljs2.default.load('./swagger.yaml');

app.use((0, _morgan2.default)('dev'));
app.use('/api/v1/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerDocument));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/api/v1', _route2.default);

var PORT = parseInt(process.env.PORT, 10) || 8000;

app.listen(PORT, function () {
  return console.log('server live on port 8000');
});
exports.default = app;