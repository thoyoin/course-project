const sequelize = require('../database');

const User = require('./User')
const Template = require('./Template')
const FormResponse = require('./FormResponse')

User.hasMany(Template, { foreignKey: 'ownerId' });
Template.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
FormResponse.belongsTo(User, { foreignKey: 'respondentId' });
FormResponse.belongsTo(Template, { foreignKey: 'templateId' });

module.exports = {
    sequelize,
    User,
    Template,
    FormResponse,
};