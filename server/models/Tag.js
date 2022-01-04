module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Recipe, {
      through: "RecipeTag",
      foreignKey: "tag_id",
    });
  };
  return Tag;
};
