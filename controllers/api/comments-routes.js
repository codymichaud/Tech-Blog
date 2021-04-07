const router = require('express').Router();
const { Comments, Posts, Users } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentsData = await Comments.findAll({
            include: [{
                model: Users,
                as: 'user',
                attributes: ['name'],
            },
            ],
        });


    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/', async (req, res) => {

});