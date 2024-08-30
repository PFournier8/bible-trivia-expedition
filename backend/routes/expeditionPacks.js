const express = require('express');
const router = express.Router();
const { ExpeditionPack, User, Question, sequelize } = require('../models');
const authenticateToken = require('../middleware/auth');


// Get all expedition packs
router.get('/', async (req, res) => {
  try {
    const packs = await ExpeditionPack.findAll({
      include: [{ model: User, as: 'creator', attributes: ['id', 'username'] }]
    });
    res.json(packs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load expedition packs', error: error.message });
  }
});

// Get a single expedition pack
router.get('/:id', async (req, res) => {
  try {
    const pack = await ExpeditionPack.findByPk(req.params.id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'username'] }]
    });
    if (pack) {
      res.json(pack);
    } else {
      res.status(404).json({ message: 'Expedition pack not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expedition pack', error: error.message });
  }
});

// POST route for creating an expedition pack with questions
router.post('/', authenticateToken, async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { name, description, isOfficial, questions } = req.body;

    // Validate questions
    if (!questions || questions.length === 0) {
      throw new Error('At least one question is required for an expedition pack.');
    }

    // Create the expedition pack
    const pack = await ExpeditionPack.create({
      name,
      description,
      creatorId: req.user.id,
      isOfficial: isOfficial || false
    }, { transaction: t });

    // Create questions
    const createdQuestions = await Question.bulkCreate(
      questions.map(q => ({
        packId: pack.id,
        questionText: q.questionText,
        questionType: q.questionType,
        correctAnswer: q.correctAnswer,
        wrongAnswers: q.wrongAnswers,
        difficulty: q.difficulty
      })),
      { transaction: t, validate: true }
    );

    await t.commit();

    res.status(201).json({
      ...pack.toJSON(),
      questions: createdQuestions
    });
  } catch (error) {
    await t.rollback();
    console.error('Error creating expedition pack:', error);
    res.status(400).json({ message: 'Failed to create expedition pack', error: error.message });
  }
});

// Update an expedition pack (requires authentication)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const pack = await ExpeditionPack.findByPk(req.params.id);
    if (!pack) {
      return res.status(404).json({ message: 'Expedition pack not found' });
    }
    if (pack.creatorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this pack' });
    }
    await pack.update(req.body);
    res.json(pack);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update expedition pack', error: error.message });
  }
});

// Delete an expedition pack (requires authentication)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const pack = await ExpeditionPack.findByPk(req.params.id);
    if (!pack) {
      return res.status(404).json({ message: 'Expedition pack not found' });
    }
    if (pack.creatorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this pack' });
    }
    await pack.destroy();
    res.json({ message: 'Expedition pack deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expedition pack', error: error.message });
  }
});

module.exports = router;