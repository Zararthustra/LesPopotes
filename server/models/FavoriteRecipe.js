module.exports = (sequelize, Sequelize) => {
  const FavoriteRecipe = sequelize.define("FavoriteRecipe", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return FavoriteRecipe;
};
