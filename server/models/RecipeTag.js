module.exports = (sequelize, Sequelize) => {
  const RecipeTag = sequelize.define("RecipeTag", {
    tag_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return RecipeTag;
};
