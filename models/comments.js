const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comments extends Model { }

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    comments_txt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    posts_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id',
        }
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
});

module.exports = Comments;