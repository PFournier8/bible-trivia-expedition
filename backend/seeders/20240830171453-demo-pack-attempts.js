'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create 10 fake users with realistic names
    const users = [
      'Bob', 'Tom', 'Eli', 'Sarah', 'Emma',
      'Mike', 'Olivia', 'Jack', 'Sophia', 'Liam'
    ].map((name, index) => ({
      username: name.toLowerCase(),
      email: `${name.toLowerCase()}@example.com`,
      passwordHash: bcrypt.hashSync('password123', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Users', users, {});

    // Get all user IDs
    const [userRows] = await queryInterface.sequelize.query('SELECT id FROM "Users" WHERE username IN (\'bob\', \'tom\', \'eli\', \'sarah\', \'emma\', \'mike\', \'olivia\', \'jack\', \'sophia\', \'liam\');');
    const userIds = userRows.map(row => row.id);

    // Get all expedition pack IDs
    const [packRows] = await queryInterface.sequelize.query('SELECT id FROM "ExpeditionPacks";');
    const packIds = packRows.map(row => row.id);

    // Create pack attempts
    const packAttempts = [];
    for (const packId of packIds) {
      for (let i = 0; i < userIds.length; i++) {
        packAttempts.push({
          userId: userIds[i],
          packId,
          wasPerfect: true,
          highestScore: 100,
          timeCompleted: Math.floor(Math.random() * (600 - 120 + 1)) + 120, // Time between 120 and 600 seconds (2-10 minutes)
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    await queryInterface.bulkInsert('PackAttempts', packAttempts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PackAttempts', null, {});
    await queryInterface.bulkDelete('Users', {
      username: {
        [Sequelize.Op.in]: ['bob', 'tom', 'eli', 'sarah', 'emma', 'mike', 'olivia', 'jack', 'sophia', 'liam']
      }
    }, {});
  }
};