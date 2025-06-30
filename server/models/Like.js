const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    templateId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Templates',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
        timestamps: true,
        updatedAt: false,
});

Like.associate = (models) => {
    Like.belongsTo(models.User, { foreignKey: 'userId' });
    Like.belongsTo(models.Template, { foreignKey: 'templateId' });
};

Like.addHook('beforeValidate', async (like, options) => {
    const exists = await Like.findOne({
        where: { templateId: like.templateId, userId: like.userId },
    });
    if (exists) {
        throw new Error('User already liked this template');
    }
});

module.exports = Like;