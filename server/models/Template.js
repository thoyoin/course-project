const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Template = sequelize.define('Template', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    templateName: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    visibility: {
        type: DataTypes.STRING,
        defaultValue: 'private',
    },
    ownerId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    questions: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true,
    },
}, {
    tableName: 'templates',
    timestamps: true,
});

module.exports = Template;