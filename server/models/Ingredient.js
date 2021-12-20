module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: Sequelize.STRING
    }
  });
  // Ingredient.associate = (models) => {
  //
  // }
  return Ingredient;
};
