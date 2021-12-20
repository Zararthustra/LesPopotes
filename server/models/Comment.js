module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    name: {
      type: Sequelize.STRING
    }
  });
  // Comment.associate = (models) => {
  //   Comment.belongsTo(models.Recipe),
  //   Comment.belongsTo(models.User),
  //   Comment.hasMany(models.Comment)
  // }
  return Comment;
};
