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
    Note.belongsTo(models.User), Note.belongsTo(models.Recipe);
  };
  return Note;
};
