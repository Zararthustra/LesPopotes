module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("Message", {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    popote_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });
  };
  return Message;
};
