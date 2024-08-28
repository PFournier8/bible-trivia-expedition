// controllers/gameController.js
const { ExpeditionPack, Question, UserScore, PowerUp } = require('../models');

exports.startGame = async (req, res) => {
  try {
    const { packId, userId } = req.body;
    const pack = await ExpeditionPack.findByPk(packId, {
      include: [Question]
    });

    if (!pack) {
      return res.status(404).json({ message: 'Expedition pack not found' });
    }

    // Shuffle questions
    const shuffledQuestions = pack.Questions.sort(() => 0.5 - Math.random());

    // Start a new game session (you might want to store this in the database)
    const gameSession = {
      userId,
      packId,
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      score: 0,
    };

    // In a real application, you'd store the game session and return a session ID
    // For now, we'll just return the first question
    res.json({
      question: shuffledQuestions[0],
      totalQuestions: shuffledQuestions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.answerQuestion = async (req, res) => {
  try {
    const { userId, packId, questionId, answer } = req.body;
    const question = await Question.findByPk(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const isCorrect = question.correct_answer === answer;

    // Update user score (in a real app, you'd update the game session)
    if (isCorrect) {
      await UserScore.create({
        user_id: userId,
        pack_id: packId,
        score: 1, // You might want to use a more complex scoring system
        accuracy: 100,
        time_taken: 0 // You'd calculate this based on the time taken to answer
      });
    }

    res.json({
      isCorrect,
      correctAnswer: question.correct_answer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.usePowerUp = async (req, res) => {
  try {
    const { userId, powerUpType } = req.body;
    const powerUp = await PowerUp.findOne({
      where: { user_id: userId, power_up_type: powerUpType }
    });

    if (!powerUp || powerUp.quantity <= 0) {
      return res.status(400).json({ message: 'Power-up not available' });
    }

    // Use the power-up (decrease quantity)
    await powerUp.update({ quantity: powerUp.quantity - 1 });

    // Apply power-up effect (this would depend on the type of power-up)
    let powerUpEffect;
    switch (powerUpType) {
      case 'fifty_fifty':
        powerUpEffect = 'Two incorrect answers have been removed';
        break;
      case 'extra_time':
        powerUpEffect = 'You have been granted 30 extra seconds';
        break;
      // Add more power-up types as needed
      default:
        powerUpEffect = 'Power-up applied';
    }

    res.json({ message: 'Power-up used successfully', effect: powerUpEffect });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};