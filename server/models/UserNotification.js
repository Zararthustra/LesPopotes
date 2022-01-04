module.exports = (sequelize, Sequelize) => {
  const UserNotification = sequelize.define("UserNotification", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    notification_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return UserNotification;
};
