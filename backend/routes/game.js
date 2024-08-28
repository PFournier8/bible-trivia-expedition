// routes/game.js
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middleware/auth');

router.post('/start', auth, gameController.startGame);
router.post('/answer', auth, gameController.answerQuestion);
router.post('/use-power-up', auth, gameController.usePowerUp);

module.exports = router;