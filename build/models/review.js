'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var reviewModel = function reviewModel(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Review.associate = function (models) {
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId'
    });
  };
  return Review;
};
exports.default = reviewModel;
//# sourceMappingURL=review.js.map