module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("Notification", {
    isChecked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
    },
    comment_id: {
      type: Sequelize.INTEGER,
    },
  });
  Notification.associate = (models) => {
    Notification.belongsToMany(models.User, {
      through: "user_notification",
      as: "users",
      foreignKey: "notification_id",
    });
  };
  return Notification;
};
