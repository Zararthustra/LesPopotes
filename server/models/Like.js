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
    }
  });
  Like.associate = (models) => {
    Like.belongsTo(models.User),
    Like.belongsTo(models.Comment);
  }
  return Like;
};
