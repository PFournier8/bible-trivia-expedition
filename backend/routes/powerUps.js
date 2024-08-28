// routes/powerUps.js
const express = require('express');
const router = express.Router();
const { PowerUp } = require('../models');

// Get all power-ups
router.get('/', async (req, res) => {
  try {
    const powerUps = await PowerUp.findAll();
    res.json(powerUps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single power-up
router.get('/:id', async (req, res) => {
  try {
    const powerUp = await PowerUp.findByPk(req.params.id);
    if (powerUp) {
      res.json(powerUp);
    } else {
      res.status(404).json({ message: 'Power-up not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new power-up
router.post('/', async (req, res) => {
  try {
    const powerUp = await PowerUp.create(req.body);
    res.status(201).json(powerUp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a power-up
router.put('/:id', async (req, res) => {
  try {
    const powerUp = await PowerUp.findByPk(req.params.id);
    if (powerUp) {
      await powerUp.update(req.body);
      res.json(powerUp);
    } else {
      res.status(404).json({ message: 'Power-up not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a power-up
router.delete('/:id', async (req, res) => {
  try {
    const powerUp = await PowerUp.findByPk(req.params.id);
    if (powerUp) {
      await powerUp.destroy();
      res.json({ message: 'Power-up deleted' });
    } else {
      res.status(404).json({ message: 'Power-up not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;