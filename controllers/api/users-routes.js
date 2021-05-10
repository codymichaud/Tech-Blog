const router = require('express').Router();
const { Users, Posts, Comments } = require('../../models');

router.get('/', (req, res) => {
    Users.findAll({
        attributes: ['id', 'username', 'email', 'password'],
        include: [{
            model: Posts,
            as: 'posts',
            attributes: ['id', 'title', 'body'],
        },
        {
            model: Comments,
            as: 'comments',
            attributes: ['id', 'comment_text', 'post_id'],
        },
        ],
    })
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((error) => {
            res.status(500).json(error)
        });
});

router.get('/:id', (req, res) => {
    Users.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'username', 'email', 'password'],
        include: [{
            model: Posts,
            as: 'posts',
            attributes: ['id', 'title', 'body'],
        },
        {
            model: Comments,
            as: 'comments',
            attributes: ['id', 'comment_text', 'post_id'],
        },
        ],
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'Sorry there are no users found with this id.'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then((dbUserData) => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json(dbUserData);
            })
        })
})