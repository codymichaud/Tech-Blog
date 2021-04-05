const sequelize = require('../config/connection');
const { Model, Datatypes } = require('sequelize');


class Posts extends Model { }

Posts.init({
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    body: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: Datatypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts'
})

module.exports = Posts;