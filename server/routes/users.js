const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
    });
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;