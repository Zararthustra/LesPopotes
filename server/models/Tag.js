module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Recipe, {
      through: "recipe_tag",
      as: "recipes",
      foreignKey: "tag_id",
    });
  };
  return Tag;
};
