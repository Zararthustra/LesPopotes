module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: Sequelize.STRING
    }
  });
  // Recipe.associate = (models) => {
  //   Recipe.belongsTo(models.User),
  //   Recipe.hasMany(models.Comment)
  // }
  return Recipe;
};
