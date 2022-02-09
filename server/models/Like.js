module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("Like", {
    isLiked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: "user_id",
    }),
      Like.belongsTo(models.Comment, {
        foreignKey: "comment_id",
        onDelete: "cascade",
      });
  };
  return Like;
};
