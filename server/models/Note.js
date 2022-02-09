module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("Note", {
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  Note.associate = (models) => {
    Note.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade",
    }),
      Note.belongsTo(models.Recipe, {
        foreignKey: "recipe_id",
        onDelete: "cascade",
      });
  };
  return Note;
};
