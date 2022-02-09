module.exports = (sequelize, Sequelize) => {
  const Step = sequelize.define("Step", {
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    nbStep: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  Step.associate = (models) => {
    Step.belongsTo(models.Recipe, {
      foreignKey: "recipe_id",
      onDelete: 'cascade'
    });
  };
  return Step;
};
