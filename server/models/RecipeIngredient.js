module.exports = (sequelize, Sequelize) => {
  const RecipeIngredient = sequelize.define("RecipeIngredient", {
    ingredient_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return RecipeIngredient;
};
