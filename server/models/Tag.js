module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: Sequelize.STRING
    }
  });
  // Tag.associate = (models) => {
  //
  // }
  return Tag;
};
