const express = require('express');
const router = express.Router();
const { Template } = require('../models');
const templateController = require('../controllers/templateController')

router.post('/', templateController.createTemplate);

router.get('/:id', async (req, res) => {
    try {
    const template = await Template.findByPk(req.params.id);
    if (!template) {
        return res.status(404).json({ message: 'Template not found' });
    }
    res.json(template);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch template' });
    }
});

router.put('/templates/:id/publish', async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTemplate = await Template.update(
            { visibility: 'public' },
            { where: { id } }
        );

        if (updatedTemplate[0] === 0) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.status(200).json({ message: 'Template published successfully' });
    } catch (error) {
        console.error('Error publishing template:', error);
        res.status(500).json({ message: 'Failed to publish template' });
    }
});

module.exports = router;