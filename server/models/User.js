module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mail: {
      type: Sequelize.STRING,
    },
    diet: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      //default value
    },
    recipes: {
      type: Sequelize.INTEGER,
    },
    popotes: {
      type: Sequelize.INTEGER,
    },
    comments: {
      type: Sequelize.INTEGER,
    },
    notes: {
      type: Sequelize.INTEGER,
    },
    linkedin: {
      type: Sequelize.STRING,
    },
    snapchat: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Recipe),
      User.hasMany(models.Note),
      User.hasMany(models.Like),
      User.hasMany(models.Comment),
      User.belongsToMany(models.Notification, {
        through: "user_notification",
        as: "notifications",
        foreignKey: "user_id",
      });
  };
  return User;
};
