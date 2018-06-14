'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _dotenv = require('dotenv');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

var basename = _path2.default.basename(__filename);
var env = process.env.NODE_ENV || 'development';
console.log(env);
var configEnv = _config2.default[env];
var db = exports.db = {};

var sequelize = void 0;
if (configEnv.use_env_variable) {
  sequelize = new _sequelize2.default(configEnv.use_env_variable);
} else {
  sequelize = new _sequelize2.default(configEnv.database, configEnv.username, configEnv.password, configEnv);
}
_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize.import(_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;
//# sourceMappingURL=index.js.map