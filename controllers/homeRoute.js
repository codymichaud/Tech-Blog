const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');


router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [{
            model: User,
            as: 'user',
            attributes: ['username'],
        },
        {
            model: Comment,
            as: 'comments',
            attributes: ['id', 'comment_text', 'user_id'],
        },
        ]
    })
})