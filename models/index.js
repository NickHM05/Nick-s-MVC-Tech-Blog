const User = require('./User');
const Post = require('./Post-model')
const Comment = require('./Comment-model');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };
