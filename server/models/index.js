const sequelize = require('../database');

const User = require('./User')
const Template = require('./Template')
const FormResponse = require('./FormResponse')
const Comment = require('./Comment')
const Like = require('./Like')

User.hasMany(Template, { foreignKey: 'ownerId' });
Template.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
FormResponse.belongsTo(User, { foreignKey: 'respondentId' });
FormResponse.belongsTo(Template, { foreignKey: 'templateId' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Comment.belongsTo(Template, { foreignKey: 'templateId' });
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Template, { foreignKey: 'templateId' });



module.exports = {
    sequelize,
    User,
    Template,
    FormResponse,
    Comment,
    Like,
};