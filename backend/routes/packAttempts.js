// routes/packAttempts.js
const express = require('express');
const router = express.Router();
const { PackAttempt, User, ExpeditionPack } = require('../models');
const authenticateToken = require('../middleware/auth');

// Get all pack attempts for a user
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const packAttempts = await PackAttempt.findAll({
      where: { userId: req.params.userId },
      include: [{ model: ExpeditionPack, attributes: ['id', 'name'] }]
    });
    res.json(packAttempts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load pack attempts', error: error.message });
  }
});

// Get all pack attempts for a pack
router.get('/pack/:packId', authenticateToken, async (req, res) => {
  try {
    const packAttempts = await PackAttempt.findAll({
      where: { packId: req.params.packId },
      include: [{ model: User, attributes: ['id', 'username'] }],
      order: [['timeCompleted', 'ASC']],
      limit: 10
    });
    res.json(packAttempts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load pack attempts', error: error.message });
  }
});

// Create or update a pack attempt
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { packId, score, timeCompleted } = req.body;
    const userId = req.user.id;

    let packAttempt = await PackAttempt.findOne({ where: { userId, packId } });

    if (packAttempt) {
      // Update existing attempt if conditions are met
      if (score > packAttempt.highestScore || (score === 100 && timeCompleted < packAttempt.timeCompleted)) {
        await packAttempt.update({
          highestScore: Math.max(packAttempt.highestScore, score),
          wasPerfect: score === 100 ? true : packAttempt.wasPerfect,
          timeCompleted: score === 100 ? Math.min(packAttempt.timeCompleted, timeCompleted) : packAttempt.timeCompleted
        });
      }
    } else {
      // Create new attempt
      packAttempt = await PackAttempt.create({
        userId,
        packId,
        highestScore: score,
        wasPerfect: score === 100,
        timeCompleted: score === 100 ? timeCompleted : null
      });
    }

    res.status(201).json(packAttempt);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create/update pack attempt', error: error.message });
  }
});

module.exports = router;