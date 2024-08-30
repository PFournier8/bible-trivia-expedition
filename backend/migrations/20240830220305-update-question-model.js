'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('questions', 'correctAnswer', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.changeColumn('questions', 'wrongAnswers', {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
    });

    // Add a constraint to ensure wrongAnswers is not empty
    await queryInterface.sequelize.query(
      'ALTER TABLE questions ADD CONSTRAINT "wrongAnswers_not_empty" CHECK (array_length("wrongAnswers", 1) > 0)'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('questions', 'correctAnswer', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.changeColumn('questions', 'wrongAnswers', {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    });

    // Remove the constraint
    await queryInterface.sequelize.query(
      'ALTER TABLE questions DROP CONSTRAINT "wrongAnswers_not_empty"'
    );
  }
};