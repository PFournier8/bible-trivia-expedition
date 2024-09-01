const express = require('express');
const router = express.Router();
const { Friend, User } = require('../models');
const authenticateToken = require('../middleware/auth');
const Op = require('sequelize').Op;
const cacheMiddleware = (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
};

// Get all friends or pending requests for the authenticated user
router.get('/', authenticateToken, cacheMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    let where = {
      [Op.or]: [
        { userId: req.user.id },
        { friendId: req.user.id }
      ]
    };

    if (status) {
      where.status = status;
    } else {
      where.status = 'accepted';
    }

    const friends = await Friend.findAll({
      where,
      include: [
        { 
          model: User, 
          as: 'user', 
          attributes: ['id', 'username'],
        },
        { 
          model: User, 
          as: 'friendUser', 
          attributes: ['id', 'username'],
        }
      ]
    });

    // Transform the results to always return the friend's information
    const transformedFriends = friends.map(friend => {
      const friendInfo = friend.userId === req.user.id ? friend.friendUser : friend.user;
      return {
        id: friend.id,
        status: friend.status,
        createdAt: friend.createdAt,
        updatedAt: friend.updatedAt,
        friend: friendInfo
      };
    });

    res.json(transformedFriends);
  } catch (error) {
    console.error('Error fetching friends:', error);
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