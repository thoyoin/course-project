const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const FormResponse = sequelize.define('FormResponse', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    templateId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    respondentId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    answers: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    isEditable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = FormResponse;