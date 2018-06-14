'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = parseInt(process.env.PORT, 10) || 8000;
_app.app.set('port', port);
var server = _http2.default.createServer(_app.app);
console.log('site launched on ' + port + ' powered by express');
server.listen(port);
//# sourceMappingURL=www.js.map