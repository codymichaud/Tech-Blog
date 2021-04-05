const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    res.render('homepage')
});


router.get('/dashboard', async (req, res) => {
    const dashData = await new User({
        where: { category: 'blog' }
    });
});

router.get('/login', async (req, res) => {
    res.render('login');
});