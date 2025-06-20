const sequelize = require('../database');

const User = require('./User')
const Template = require('./Template')

User.hasMany(Template, { foreignKey: 'userId'});
Template.belongsTo(User, { foreignKey: 'userId'});

module.exports = {
    sequelize,
    User,
    Template,
};