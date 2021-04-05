const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comments extends Model { }

Comments.init({
    id: {},
    comments_txt: {},
    user_id: {},
    posts_id: {},
})