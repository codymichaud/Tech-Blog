const router = require('express').Router();
const { Users, Posts, Comments } = require('../../models');

router.get('/', (req, res) => {
    Comments.findAll({
        attributes: ['id', 'comment_body', 'user_id', 'post_id'],
        include: [{
            model: Users,
            as: 'user',
            attributes: ['username'],
        },
        ],
    })
        .then((dbCommentData) => {
            res.json(dbCommentData);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});
