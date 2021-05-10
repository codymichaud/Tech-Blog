const router = require('express').Router();
const { Users, Posts, Comments } = require('../models');
const sequelize = require('../config/connection');


router.get('/', (req, res) => {
    Posts.findAll({
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

router.get('/', (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [{
            model: Users,
            as: 'user',
            attributes: ['username']
        },
        {
            model: Comments,
            as: 'comments',
            attributes: ['id', 'comment_text', 'user_id'],
            include: [{
                model: Users,
                as: 'users',
                attributes: 'username',

            }]
        }
        ]
    })
})