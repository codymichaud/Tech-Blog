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
            attributes: ['id', 'comment_body', 'user_id'],
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
            res.render('homepage', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get('/viewpost/:id', (req, res) => {
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
            attributes: ['id', 'comment_body', 'user_id'],
            include: [{
                model: Users,
                as: 'users',
                attributes: ['username'],
            },],
        },
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'Sorry there are no posts available.'
                });
                return;
            }
            const posts = dbPostData.get({
                plain: true
            });
            const userPosts = posts.user_id == req.session.user_id;
            res.render('readPost', {
                posts,
                loggedIn: req.session.loggedIn,
                currentUsers: userPosts,
            });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get('/login', (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/dashboard', (req, res) => {
    Posts.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [{
            model: Users,
            as: 'user',
            attributes: ['username'],
        },
        {
            model: Comments,
            as: 'comments',
            attributes: ['id', 'comment_body', 'user_id'],
            include: [{
                model: Users,
                as: 'user',
                attributes: ['username'],
            },],
        },
        ],
    })
        .then((dbPostData) => {
            if (!dbpostData) {
                res.status(400).json({
                    message: 'Sorry there are no posts available.'
                });
                return;
            }
            const post = dbPostData.map((posts) => posts.get({
                plain: true
            }));
            res.render('dashboard', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get('/post', (req, res) => {
    res.render('createPost', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;