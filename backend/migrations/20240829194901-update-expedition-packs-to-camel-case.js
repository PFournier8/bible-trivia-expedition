'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('ExpeditionPacks', 'creator_id', 'creatorId');
    await queryInterface.renameColumn('ExpeditionPacks', 'is_official', 'isOfficial');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('ExpeditionPacks', 'creatorId', 'creator_id');
    await queryInterface.renameColumn('ExpeditionPacks', 'isOfficial', 'is_official');
  }
};