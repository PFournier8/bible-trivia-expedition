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

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  // Add more socket event handlers here as needed
});

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