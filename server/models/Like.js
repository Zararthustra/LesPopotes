module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("Like", {
    name: {
      type: Sequelize.STRING
    }
  });
  // Like.associate = (models) => {
  //
  // }
  return Like;
};
