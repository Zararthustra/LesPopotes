module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    thread_id: {
      type: Sequelize.INTEGER,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
    dislikes: {
      type: Sequelize.INTEGER,
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Recipe),
      Comment.belongsTo(models.User),
      Comment.hasMany(models.Like),
      Comment.hasMany(models.Comment, {
        as: "thread",
        foreignKey: "commentId",
        useJunctionTable: false,
      });
  };
  return Comment;
};
