module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    }
  });
  // User.associate = (models) => {
  //   User.belongsTo(models.User),
  //   User.hasMany(models.Recipe)
  // }
  return User;
};
