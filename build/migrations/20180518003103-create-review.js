'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.createTable('Reviews', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      businessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Businesses',
          key: 'id',
          as: 'businessId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Reviews');
  }
};
//# sourceMappingURL=20180518003103-create-review.js.map