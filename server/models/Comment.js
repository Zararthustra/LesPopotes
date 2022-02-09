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
    author: {
      type: Sequelize.STRING,
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
    Comment.belongsTo(models.Recipe, {
      foreignKey: "recipe_id",
      onDelete: "cascade",
    }),
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "cascade",
      }),
      Comment.hasMany(models.Like);
  };
  return Comment;
};
