'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var businessModel = function businessModel(sequelize, DataTypes) {
  var Business = sequelize.define('Business', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // businessPhoto: {
    //   type: DataTypes.STRING.BINARY,
    //   allowNull: false,
    // },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM,
      values: ['Sports', 'Entertainment', 'Transportation', 'Fashion', 'Software Development'],
      defaultValue: 'Sports'
    },
    profile: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    }
  });
  Business.associate = function (models) {
    Business.hasMany(models.Review, {
      foreignKey: 'businessId'
    });
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Business;
};
exports.default = businessModel;
//# sourceMappingURL=business.js.map