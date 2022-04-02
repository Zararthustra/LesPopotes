module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("Notification", {
    isChecked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: Sequelize.STRING,
    },
    receiver_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sender_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sender_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
    },
    comment_id: {
      type: Sequelize.INTEGER,
    },
    note_id: {
      type: Sequelize.INTEGER,
    },
    message_id: {
      type: Sequelize.INTEGER,
    },
    friendship_id: {
      type: Sequelize.INTEGER,
    },
    thread_id: {
      type: Sequelize.INTEGER,
    },
    like_id: {
      type: Sequelize.INTEGER,
    },
  });
  return Notification;
};
