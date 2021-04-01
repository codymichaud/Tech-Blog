const User = require('./Users');
const Dashboard = require('./Dashboards');

User.hasMany(Dashboard, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Dashboard.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Dashboard };
