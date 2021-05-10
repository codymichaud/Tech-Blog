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
            attributes: ['id', 'comment_body', 'post_id'],
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
            attributes: ['id', 'comment_body', 'post_id'],
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
            });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    Users.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(400).json({
                    message: 'Sorry that username is incorrect.'
                });
                return;
            }
            const passwordIsValid = dbUserData.checkPassword(req.body.password);
            if (!passwordIsValid) {
                res.status(400).json({
                    message: 'Sorry that password  is incorrect.'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({
                    user: dbUserData,
                    message: 'You have successfully logged in!!'
                });
            });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;