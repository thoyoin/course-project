const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Template = sequelize.define('Template', {
    title: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
    },
    userId: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'templates',
    timestamps: true,
});

module.exports = Template;