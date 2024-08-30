const express = require('express');
const router = express.Router();
const { Question, Answer, ExpeditionPack, User } = require('../models');
const authenticateToken = require('../middleware/auth');
const { sequelize } = require('../models');

// Get all questions with their answers
router.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [
        { model: Answer },
        { 
          model: ExpeditionPack,
          include: [{ model: User, as: 'creator', attributes: ['id', 'username'] }]
        }
      ]
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load questions', error: error.message });
  }
});

// Get a single question with its answers
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id, {
      include: [
        { model: Answer },
        { 
          model: ExpeditionPack,
          include: [{ model: User, as: 'creator', attributes: ['id', 'username'] }]
        }
      ]
    });
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving question', error: error.message });
  }
});

// Create a new question with answers (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { packId, questionText, questionType, difficulty, answers } = req.body;
    const question = await Question.create({
      packId,
      questionText,
      questionType,
      difficulty
    });

    if (answers && answers.length > 0) {
      await Answer.bulkCreate(answers.map(answer => ({
        ...answer,
        questionId: question.id
      })));
    }

    const createdQuestion = await Question.findByPk(question.id, {
      include: [{ model: Answer }]
    });
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create question', error: error.message });
  }
});

// Update a question and its answers (requires authentication)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { questionText, questionType, difficulty, answers } = req.body;
    const question = await Question.findByPk(req.params.id, {
      include: [{ model: ExpeditionPack }]
    });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    if (question.ExpeditionPack.creatorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this question' });
    }

    await question.update({ questionText, questionType, difficulty });
    
    if (answers && answers.length > 0) {
      await Answer.destroy({ where: { questionId: question.id } });
      await Answer.bulkCreate(answers.map(answer => ({
        ...answer,
        questionId: question.id
      })));
    }

    const updatedQuestion = await Question.findByPk(question.id, {
      include: [{ model: Answer }]
    });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update question', error: error.message });
  }
});

// Delete a question and its answers (requires authentication)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id, {
      include: [{ model: ExpeditionPack }]
    });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    if (question.ExpeditionPack.creatorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this question' });
    }

    await Answer.destroy({ where: { questionId: question.id } });
    await question.destroy();
    res.json({ message: 'Question and associated answers deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete question', error: error.message });
  }
});

// route to get questions by pack ID
router.get('/by-pack/:packId', authenticateToken, async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { packId: req.params.packId },
      order: sequelize.random(),
      limit: 10 // Adjust this number as needed
    });

    // Format the questions based on their type
    const formattedQuestions = questions.map(q => {
      const formattedQ = q.toJSON();
      if (formattedQ.questionType === 'truefalse') {
        formattedQ.answers = [
          { text: 'True', isCorrect: formattedQ.correctAnswer.toLowerCase() === 'true' },
          { text: 'False', isCorrect: formattedQ.correctAnswer.toLowerCase() === 'false' }
        ];
      } else {
        formattedQ.answers = [
          { text: formattedQ.correctAnswer, isCorrect: true },
          ...formattedQ.wrongAnswers.map(answer => ({ text: answer, isCorrect: false }))
        ];
      }
      delete formattedQ.correctAnswer;
      delete formattedQ.wrongAnswers;
      return formattedQ;
    });

    res.json(formattedQuestions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load questions', error: error.message });
  }
});

module.exports = router;