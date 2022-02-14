module.exports = (sequelize, Sequelize) => {
  const Friendship = sequelize.define("Friendship", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    popote_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  Friendship.associate = (models) => {
    Friendship.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });
  };
  return Friendship;
};
