'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Products', 'title', {
      type: Sequelize.STRING(1000),
      allowNull: false
    });
    await queryInterface.changeColumn('Products', 'imageUrl', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    await queryInterface.changeColumn('Products', 'productUrl', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Products', 'title', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
    await queryInterface.changeColumn('Products', 'imageUrl', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
    await queryInterface.changeColumn('Products', 'productUrl', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
  }
};