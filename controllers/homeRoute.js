const router = require('express').Router();
const { json } = require('sequelize/types');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {

    } catch (error) {

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