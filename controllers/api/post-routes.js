const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "body", "user_id"],
        include: [{
            model: Comment,
            as: "comments",
            attributes: ["id", "comment_text", "user_id"],
        }]
    }).then((dbPostData) => {
        res.json(dbPostData);

    }).catch((err) => {
        res.status(500).json(err);
    });
});


router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "title", "body", "user_id"],
        include: [{
            model: Comment,
            as: "comments",
            attributes: ["id", "comment_text", "user_id"],
        }]
    }).then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({
                message: "Sorry there is no post found with this id."
            });
            return;
        }
        res.json(dbPostData);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.post("/", (req, res) => {

    Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
    }).then((dbPostData) => {
        res.json(dbPostData);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
    Post.update({
        title: req.body.title,
        body: req.body.body,
    }, {
        where: {
            id: req.params.id,
        },
    }).then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({
                message: "Sorry there is no post found with this id."
            });
            return;
        }
        res.json(dbPostData);
    }).catch((err) => {
        res.json(err);
    });
});

router.delete("/:id", (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    }).then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({
                message: "Sorry there is no post found with this id."
            });
            return;
        }
        res.json(dbPostData);

    }).catch((err) => {
        res.status(500).json(err);
    });
});
module.exports = router;