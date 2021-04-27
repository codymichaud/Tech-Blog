const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const post = postData.map((posts) => post.get({ plain: true }));

        res.render('all-posts', {
            post
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dashData = await new User({
            where: { category: 'blog' }
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        res.status(500), json(error);
    }

});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findbyPk(req.params.id, {
            include: [
                User, {
                    model: Comment,
                    inlude: [User]
                }
            ],
        });

        if (postData) {
            const post = postData.get({ plain: true });
            res.render('single-post', {
                post
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(500).json(error)
    }
})