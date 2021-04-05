const router = require('express').Router();

const commentsRoutes = require('./api/comments-routes');
const usersRoutes = require('./api/users-routes');
const postsRoutes = require("./api/posts-routes");
const homeRoutes = require('./homeRoute');

router.use('/', homeRoutes);
router.use('./api/comments', commentsRoutes);
router.use('./api/posts', postsRoutes);
router.use('./api/users', usersRoutes);

module.exports = router;