require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { sequelize } = require('./models');
const userRoutes = require('./routes/users');
const expeditionPackRoutes = require('./routes/expeditionPacks');
const questionRoutes = require('./routes/questions');
const userScoreRoutes = require('./routes/userScores');
const powerUpRoutes = require('./routes/powerUps');
const gameRoutes = require('./routes/game');
const packAttemptRoutes = require('./routes/packAttempts');
const friendRoutes = require('./routes/friends');
const { ExpeditionPack, Question, User } = require('./models');

const app = express();
const server = http.createServer(app);

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const io = socketIo(server, {
  cors: corsOptions
});

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/expedition-packs', expeditionPackRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/user-scores', userScoreRoutes);
app.use('/api/power-ups', powerUpRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/pack-attempts', packAttemptRoutes);
app.use('/api/friends', friendRoutes);


// Game rooms to store ongoing multiplayer games
const gameRooms = new Map();
const waitingPlayers = new Map(); // Map packId to array of waiting players

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join-game', async ({ packId, userId }) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        socket.emit('error', 'User not found');
        return;
      }

      if (!waitingPlayers.has(packId)) {
        waitingPlayers.set(packId, []);
      }

      const waitingList = waitingPlayers.get(packId);
      
      if (waitingList.length > 0) {
        const opponent = waitingList.shift();
        createGameRoom(packId, [opponent, { id: userId, username: user.username, socket }]);
      } else {
        waitingList.push({ id: userId, username: user.username, socket });
        socket.emit('waiting-for-opponent');
      }
    } catch (error) {
      console.error('Error joining game:', error);
      socket.emit('error', 'Failed to join game');
    }
  });

  socket.on('submit-answer', ({ roomId, userId, answer, timeLeft }) => {
    const room = gameRooms.get(roomId);
    if (!room) {
      socket.emit('error', 'Game room not found');
      return;
    }

    const currentQuestion = room.questions[room.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    const score = isCorrect ? timeLeft : 0;

    room.scores[userId] += score;
    room.answers[userId] = { answer, isCorrect, score };

    if (Object.keys(room.answers).length === 2 || timeLeft === 0) {
      io.to(roomId).emit('round-result', {
        answers: room.answers,
        scores: room.scores,
        correctAnswer: currentQuestion.correctAnswer
      });

      room.answers = {};
      room.currentQuestionIndex++;

      if (room.currentQuestionIndex < room.questions.length) {
        setTimeout(() => sendNextQuestion(room), 5000); // Wait 5 seconds before next question
      } else {
        io.to(roomId).emit('game-over', { finalScores: room.scores });
        gameRooms.delete(roomId);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Remove player from waiting list if they disconnect while waiting
    for (const [packId, waitingList] of waitingPlayers.entries()) {
      const index = waitingList.findIndex(player => player.socket === socket);
      if (index !== -1) {
        waitingList.splice(index, 1);
        if (waitingList.length === 0) {
          waitingPlayers.delete(packId);
        }
        return;
      }
    }

    // Handle disconnection during active game
    for (const [roomId, room] of gameRooms.entries()) {
      const playerIndex = room.players.findIndex(player => player.socket === socket);
      if (playerIndex !== -1) {
        const opponent = room.players[1 - playerIndex];
        opponent.socket.emit('opponent-disconnected');
        gameRooms.delete(roomId);
        return;
      }
    }
  });
});

async function createGameRoom(packId, players) {
  const pack = await ExpeditionPack.findByPk(packId, {
    include: [{ model: Question, attributes: ['id', 'questionText', 'correctAnswer', 'wrongAnswers'] }]
  });

  if (!pack) {
    players.forEach(player => player.socket.emit('error', 'Expedition pack not found'));
    return;
  }

  const room = {
    id: `room_${Date.now()}`,
    packId,
    players,
    questions: pack.Questions,
    currentQuestionIndex: 0,
    scores: {},
    answers: {}
  };

  players.forEach(player => {
    player.socket.join(room.id);
    room.scores[player.id] = 0;
  });

  gameRooms.set(room.id, room);
  io.to(room.id).emit('game-start', { roomId: room.id });
  sendNextQuestion(room);
}

function sendNextQuestion(room) {
  const question = room.questions[room.currentQuestionIndex];
  const answers = [...question.wrongAnswers, question.correctAnswer].sort(() => Math.random() - 0.5);
  io.to(room.id).emit('new-question', {
    questionText: question.questionText,
    answers,
    timeLimit: 30
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();