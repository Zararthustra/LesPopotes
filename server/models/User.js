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
    twitter: {
      type: Sequelize.STRING,
    },
    tiktok: {
      type: Sequelize.STRING,
    },
    whatsapp: {
      type: Sequelize.STRING,
    },
    mail: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};
