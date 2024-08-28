// routes/userScores.js
const express = require('express');
const router = express.Router();
const { UserScore } = require('../models');

// Get all user scores
router.get('/', async (req, res) => {
  try {
    const scores = await UserScore.findAll();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user score
router.get('/:id', async (req, res) => {
  try {
    const score = await UserScore.findByPk(req.params.id);
    if (score) {
      res.json(score);
    } else {
      res.status(404).json({ message: 'User score not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user score
router.post('/', async (req, res) => {
  try {
    const score = await UserScore.create(req.body);
    res.status(201).json(score);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a user score
router.put('/:id', async (req, res) => {
  try {
    const score = await UserScore.findByPk(req.params.id);
    if (score) {
      await score.update(req.body);
      res.json(score);
    } else {
      res.status(404).json({ message: 'User score not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user score
router.delete('/:id', async (req, res) => {
  try {
    const score = await UserScore.findByPk(req.params.id);
    if (score) {
      await score.destroy();
      res.json({ message: 'User score deleted' });
    } else {
      res.status(404).json({ message: 'User score not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;