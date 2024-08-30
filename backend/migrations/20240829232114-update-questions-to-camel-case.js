'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('questions', 'pack_id', 'packId');
    await queryInterface.renameColumn('questions', 'question_text', 'questionText');
    await queryInterface.renameColumn('questions', 'correct_answer', 'correctAnswer');
    await queryInterface.renameColumn('questions', 'wrong_answers', 'wrongAnswers');
    await queryInterface.renameColumn('questions', 'created_at', 'createdAt');
    
    // If you have an updated_at column (not shown in your schema, but typically present):
    // await queryInterface.renameColumn('questions', 'updated_at', 'updatedAt');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('questions', 'packId', 'pack_id');
    await queryInterface.renameColumn('questions', 'questionText', 'question_text');
    await queryInterface.renameColumn('questions', 'correctAnswer', 'correct_answer');
    await queryInterface.renameColumn('questions', 'wrongAnswers', 'wrong_answers');
    await queryInterface.renameColumn('questions', 'createdAt', 'created_at');
    
    // If you renamed updated_at in the up migration:
    // await queryInterface.renameColumn('questions', 'updatedAt', 'updated_at');
  }
};