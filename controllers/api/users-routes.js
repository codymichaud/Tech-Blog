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

