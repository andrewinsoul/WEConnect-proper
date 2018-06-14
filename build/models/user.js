'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var userModel = function userModel(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });
  User.associate = function (models) {
    User.hasMany(models.Business, {
      foreignKey: 'userId',
      as: 'biz'
    });
  };
  return User;
};
exports.default = userModel;
//# sourceMappingURL=user.js.map