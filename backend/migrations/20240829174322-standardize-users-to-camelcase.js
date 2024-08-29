'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'password_hash', 'passwordHash');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'passwordHash', 'password_hash');
  }
};