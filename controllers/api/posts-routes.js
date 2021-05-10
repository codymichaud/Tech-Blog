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

router.get('/:id', (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [{
            model: Comments,
            as: 'comments',
            attributes: ['id', 'comment_body', 'user_id'],
        }]
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'Sorry there are no posts found with this id'
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    Posts.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
    })
        .then((dbPostData) => {
            res.json(dbPostData);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.put(':id', (req, res) => {
    Posts.update({
        title: req.body.title,
        body: req.body.body,
    },
        {
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (dbPostData) {
                res.status(404).json({
                    message: 'Sorry there are no posts found with this id'
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((error) => {
            res.json(error);
        });
});

module.exports = router;