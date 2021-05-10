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
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'There are no posts available to view'
                });
                return;
            }
            const post = dbPostData.map((posts) => posts.get({
                plain: true
            }));
            res.render('home', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});