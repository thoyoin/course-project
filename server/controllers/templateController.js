const { Template } = require('../models');

exports.createTemplate = async (req, res) => {
    
    try {
        const { templateName, description, tags, visibility, questions } = req.body;

        const newTemplate = await Template.create({
            templateName: templateName || '',
            description: description || '',
            tags: tags || [],
            visibility: visibility || 'private',
            questions: questions || [],
            ownerId: req.userId || 1,
        }); 
        
        console.log('Creating template with:', {
            body: req.body,
            ownerId: req.userId
        });

        res.status(201).json({ id: newTemplate.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create template' });
    }
};

exports.publishTemplate = async (req, res) => {
    try {
    const { templateId, access } = req.body;

    if (!templateId || !access) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const template = await Template.findByPk(templateId);
    if (!template) {
        return res.status(404).json({ message: 'Template not found' });
    }

    template.isPublic = access === 'public';
    template.status = 'published';

    await template.save();

    res.status(200).json({ message: 'Template published successfully', id: template.id });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to publish template' });
    }
};