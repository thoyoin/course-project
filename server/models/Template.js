const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Template = sequelize.define('Template', {
    templateName: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    visibility: {
        type: DataTypes.STRING,
        defaultValue: 'private',
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    questions: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'templates',
    timestamps: true,
});

module.exports = Template;