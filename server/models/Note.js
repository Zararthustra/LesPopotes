module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("Note", {
    name: {
      type: Sequelize.STRING
    }
  });
  // Note.associate = (models) => {
  //
  // }
  return Note;
};
