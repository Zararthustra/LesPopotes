module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("Notification", {
    name: {
      type: Sequelize.STRING
    }
  });
  // Notification.associate = (models) => {
  //
  // }
  return Notification;
};
