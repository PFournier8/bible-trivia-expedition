const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'No Authorization header provided' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = auth;