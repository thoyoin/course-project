const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { FormResponse } = require('../models/FormResponse');

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

module.exports = router;