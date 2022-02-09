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
  FavoriteRecipe.associate = (models) => {
    FavoriteRecipe.belongsTo(models.Recipe, {
      foreignKey: "recipe_id",
      onDelete: "cascade",
    });
  };
  return FavoriteRecipe;
};
