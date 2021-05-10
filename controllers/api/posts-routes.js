const router = require('express').Router();
const { Users, Posts, Comments } = require('../../models');

router.get('/', (req, res) => {
    Posts.findAll({
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [{
            model: Comments,
            as: 'comments',
            attributes: ['id', 'comment_body', 'user_id'],
        }]
    })
        .then((dbPostData) => {
            res.json(dbPostData);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

