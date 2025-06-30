const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');
const authenticate = require('../middleware/authenticate');

router.get('/:templateId/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { templateId: req.params.templateId },
      order: [['createdAt', 'ASC']],
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get comments' });
  }
});

router.post('/:templateId/comments', authenticate, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Comment content required' });
    }

    const comment = await Comment.create({
      templateId: req.params.templateId,
      authorId: req.userId,
      content: content.trim(),
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

router.delete('/:commentId', authenticate, async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.authorId !== req.userId) {
      return res.status(403).json({ message: 'Forbidden: not authorized to delete this comment' });
    }

    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment' });
  }
});

module.exports = router;