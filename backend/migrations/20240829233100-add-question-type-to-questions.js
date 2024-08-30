'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('questions', 'questionType', {
      type: Sequelize.ENUM('multiplechoice', 'truefalse'),
      allowNull: false,
      defaultValue: 'multiplechoice'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'questionType');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_questions_questionType";');
  }
};