module.exports = (sequelize, Sequelize) => {
  const Forum = sequelize.define("Forum", {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Forum;
};
