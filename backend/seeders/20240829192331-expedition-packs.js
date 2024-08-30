'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminUser = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE username = 'admin' LIMIT 1;`
    );
    const adminUserId = 69;

    const packs = [
      {
        name: 'Bible Basics',
        description: 'A pack for Bible beginners.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'New Testament',
        description: 'A pack focusing on the teachings and events of the New Testament.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Old Testament',
        description: 'A pack covering the stories and laws of the Old Testament.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Prophets',
        description: 'Dive into the lives and messages of the major and minor prophets.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Parables of Jesus',
        description: 'Explore the teachings of Jesus through his parables.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Psalms',
        description: 'A collection of the most inspiring and comforting Psalms.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Women of the Bible',
        description: 'Learn about the influential women in the Bible.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Miracles of Jesus',
        description: 'Explore the miraculous works performed by Jesus.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Ten Commandments',
        description: 'A deep dive into the Ten Commandments and their significance.',
        creatorId: adminUserId,
        isOfficial: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('ExpeditionPacks', packs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ExpeditionPacks', null, {});
  }
};
