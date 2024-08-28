// routes/expeditionPacks.js
const express = require('express');
const router = express.Router();
const { ExpeditionPack } = require('../models');

// Get all expedition packs
router.get('/', async (req, res) => {
  try {
    const packs = await ExpeditionPack.findAll();
    res.json(packs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single expedition pack
router.get('/:id', async (req, res) => {
  try {
    const pack = await ExpeditionPack.findByPk(req.params.id);
    if (pack) {
      res.json(pack);
    } else {
      res.status(404).json({ message: 'Expedition pack not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new expedition pack
router.post('/', async (req, res) => {
  try {
    const pack = await ExpeditionPack.create(req.body);
    res.status(201).json(pack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an expedition pack
router.put('/:id', async (req, res) => {
  try {
    const pack = await ExpeditionPack.findByPk(req.params.id);
    if (pack) {
      await pack.update(req.body);
      res.json(pack);
    } else {
      res.status(404).json({ message: 'Expedition pack not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an expedition pack
router.delete('/:id', async (req, res) => {
  try {
    const pack = await ExpeditionPack.findByPk(req.params.id);
    if (pack) {
      await pack.destroy();
      res.json({ message: 'Expedition pack deleted' });
    } else {
      res.status(404).json({ message: 'Expedition pack not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;