const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const FormResponse = require('../models/FormResponse');
const Template = require('../models/Template')

router.post('/:templateId/submit', authenticate, async (req, res) => {
    try {
        const { answers } = req.body;
        const { templateId } = req.params;
        const respondentId = req.userId;

        console.log('Respondent ID:', req.userId);
        console.log('Template ID:', req.params.templateId);
        console.log('Answers:', req.body.answers);

        if (typeof answers !== 'object' || answers === null) {
            return res.status(400).json({ message: 'Answers must be an object' });
        }

        const form = await FormResponse.create({
            templateId,
            respondentId,
            answers
        });

        res.status(201).json({ message: 'Form submitted', formId: form.id });
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ message: 'Failed to submit form' });
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const forms = await FormResponse.findAll({
            include: [{ model: Template, attributes: ['templateName']}],
        });
        res.status(200).json(forms);
    } catch (err) {
        console.error('Error fetching form responses:', err);
        res.status(500).json({message: 'Failed to fetch form responses'});
    }
})

router.get('/:formId', authenticate, async (req, res) => {
    try {
        const { formId } = req.params;
        const form = await FormResponse.findByPk(formId, {
            include: [{ model: Template, attributes: ['templateName']}],
        });
        if (!form) {
            return res.status(404).json({ message: 'Form not found'});
        }
        res.status(200).json(form);
    } catch (err) {
        console.error('Error fetching form:', err);
        res.status(500).json({ message: 'Failed to fetch form'});
    }
});

module.exports = router;