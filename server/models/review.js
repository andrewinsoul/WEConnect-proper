const reviewModel = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
    });
  };
  return Review;
};
export default reviewModel;
