module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Businesses', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM,
        values: ['Sports', 'Entertainment', 'Transportation', 'Fashion', 'Software Development'],
        defaultValue: 'Sports',
      },
      profile: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => queryInterface.dropTable('Businesses'),
};
