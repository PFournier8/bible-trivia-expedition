// routes/questions.js
const express = require('express');
const router = express.Router();
const { Question } = require('../models');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single question
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new question
router.post('/', async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a question
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      await question.update(req.body);
      res.json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a question
router.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      await question.destroy();
      res.json({ message: 'Question deleted' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;