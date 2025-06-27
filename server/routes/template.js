const express = require('express');
const router = express.Router();
const { Template } = require('../models');
const templateController = require('../controllers/templateController')

const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, templateController.createTemplate);

router.get('/all', async (req, res) => {
    try {
        const templates = await Template.findAll({
            order: [['updatedAt', 'DESC']],
        });

        res.status(200).json(templates);
    } catch (err) {
        console.error('Error fetching templates:', err);
        res.status(500).json({message: 'Failed to fetch templates'});
    }
});

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

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTemplate = await Template.destroy({ where: { id } });

        if (!deletedTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.status(200).json({ message: 'Template deleted successfully' });
    } catch (err) {
        console.error('Error deleting template:', err);
        res.status(500).json({ message: 'Failed to delete template' });
    }
})

router.put('/:id/publish', async (req, res) => {
    try {
        const { id } = req.params;
        const { visibility } = req.body;

        const template = await Template.findByPk(id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        template.visibility = visibility;
        await template.save();

        res.status(200).json({ message: `Template visibility updated to '${visibility}'` });
    } catch (error) {
        console.error('Error updating visibility:', error);
        res.status(500).json({ message: 'Failed to update template visibility' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedTemplate = await Template.update(updatedData, {
            where: { id },
        });

        if (updatedTemplate[0] === 0) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.status(200).json({ message: 'Template updated successfully' });
    } catch (err) {
        console.error('Error updating template:', err);
        res.status(500).json({ message: 'Failed to update template' });
    }
});

router.put('/:id/updatedOrder', async (req, res) => {
    const { id } = req.params;
    const { questions } = req.body;

    try {
        const template = await Template.findByPk(id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        template.questions = questions;
        await template.save();

        res.status(200).json({ message: 'Question order updated successfully' });
    } catch (error) {
        console.error('Error updating question order:', error);
        res.status(500).json({ message: 'Failed to update question order' });
    }
})

module.exports = router;