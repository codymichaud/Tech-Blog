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

router.get('/:id', (req, res) => {
    Comments.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'comment_body', 'user_id', 'post_id'],
        include: [{
            model: Users,
            as: 'user',
            attributes: ['username'],
        },
        ],
    })
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({
                    message: 'Sorry this comment does not exist in our database.'
                });
                return;
            }
            res.json(dbCommentData);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    Comments.create({
        comment_body: req.body.comment_body,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
    })
        .then((dbCommentData) => {
            res.json(dbCommentData);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    Posts.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({
                    message: 'This comment cannot be found. Trying deleting an existing comment'
                });
                return;
            }
            res.json(dbCommentData);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

module.exports = router;