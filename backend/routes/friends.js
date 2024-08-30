const express = require('express');
const router = express.Router();
const { Friend, User } = require('../models');
const authenticateToken = require('../middleware/auth');

// Get all friends for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const friends = await Friend.findAll({
      where: {
        userId: req.user.id,
        status: 'accepted'
      },
      include: [{ model: User, as: 'friendUser', attributes: ['id', 'username'] }]
    });
    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load friends', error: error.message });
  }
});

// Send a friend request
router.post('/request', authenticateToken, async (req, res) => {
  try {
    const { friendId } = req.body;
    const friendship = await Friend.create({
      userId: req.user.id,
      friendId,
      status: 'pending'
    });
    res.status(201).json(friendship);
  } catch (error) {
    res.status(400).json({ message: 'Failed to send friend request', error: error.message });
  }
});

// Accept or reject a friend request
router.put('/respond', authenticateToken, async (req, res) => {
  try {
    const { friendshipId, status } = req.body;
    const friendship = await Friend.findOne({
      where: { id: friendshipId, friendId: req.user.id, status: 'pending' }
    });
    if (!friendship) {
      return res.status(404).json({ message: 'Friend request not found' });
    }
    await friendship.update({ status });
    res.json(friendship);
  } catch (error) {
    res.status(400).json({ message: 'Failed to respond to friend request', error: error.message });
  }
});

// Remove a friend
router.delete('/:friendId', authenticateToken, async (req, res) => {
  try {
    const { friendId } = req.params;
    await Friend.destroy({
      where: {
        [Op.or]: [
          { userId: req.user.id, friendId },
          { userId: friendId, friendId: req.user.id }
        ],
        status: 'accepted'
      }
    });
    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove friend', error: error.message });
  }
});

module.exports = router;