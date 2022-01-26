module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    unity: {
      type: Sequelize.STRING,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Ingredient;
};
