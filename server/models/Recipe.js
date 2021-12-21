module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      // default value
    },
    nbPers: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isNbVariable: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bakeTime: {
      type: Sequelize.INTEGER,
    },
    prepTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bakeType: {
      type: Sequelize.STRING,
    },
    difficulty: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.INTEGER,
    },
    notes: {
      type: Sequelize.INTEGER,
    },
    signal: {
      type: Sequelize.INTEGER,
    },
    authorComment: {
      type: Sequelize.STRING,
    },
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User),
      Recipe.hasMany(models.Comment),
      Recipe.hasMany(models.Notification),
      Recipe.hasMany(models.Note),
      Recipe.hasMany(models.Step),
      Recipe.belongsToMany(models.User, {
        through: "favorite_recipe",
        as: "users",
        foreignKey: "recipe_id",
      }),
      Recipe.belongsToMany(models.Ingredient, {
        through: "recipe_ingredient",
        as: "ingredients",
        foreignKey: "recipe_id",
      }),
      Recipe.belongsToMany(models.Tag, {
        through: "recipe_tag",
        as: "tags",
        foreignKey: "recipe_id",
      });
  };
  return Recipe;
};
