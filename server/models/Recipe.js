module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
    tags: {
      type: Sequelize.STRING,
    },
    nbPers: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isNbVariable: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bakeTime: {
      type: Sequelize.INTEGER,
    },
    prepTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bakeType: {
      type: Sequelize.STRING,
    },
    difficulty: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.INTEGER,
    },
    notes: {
      type: Sequelize.INTEGER,
    },
    average: {
      type: Sequelize.DECIMAL(10, 2),
    },
    signal: {
      type: Sequelize.INTEGER,
    },
    authorComment: {
      type: Sequelize.STRING,
    },
  });
  return Recipe;
};
