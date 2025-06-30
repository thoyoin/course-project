const express = require('express');
const router = express.Router();
const { Like } = require('../models');
const authenticate = require('../middleware/authenticate');

router.get('/:templateId/likes', authenticate, async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const userId = req.userId;

    const count = await Like.count({ where: { templateId } });
    const userLike = await Like.findOne({ where: { templateId, userId } });

    res.json({ count, likedByUser: !!userLike });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get likes' });
  }
});

router.post('/:templateId/likes', authenticate, async (req, res) => {
  try {
    const templateId = req.params.templateId;
    const userId = req.userId;

    const existingLike = await Like.findOne({ where: { templateId, userId } });
    if (existingLike) {
      await existingLike.destroy();
      return res.json({ liked: false });
    }

    await Like.create({ templateId, userId });
    res.json({ liked: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle like' });
  }
});

module.exports = router;