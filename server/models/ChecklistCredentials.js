module.exports = (sequelize, Sequelize) => {
  const ChecklistCredentials = sequelize.define("ChecklistCredentials", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return ChecklistCredentials;
};
