const Users = require('./Users');
const Comments = require('./Comments');
const Posts = require('./Posts')

Users.hasMany(Posts, {
    foreignKey: 'user_id',
});

Posts.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Posts, {
    foreignKey: 'posts_id',
    onDelete: 'CASCADE'
});

Users.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


Dashboard.belongsTo(Users, {
    foreignKey: 'user_id'
});

module.exports = { User, Dashboard };
