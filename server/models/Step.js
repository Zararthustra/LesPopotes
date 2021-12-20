module.exports = (sequelize, Sequelize) => {
  const Step = sequelize.define("Step", {
    name: {
      type: Sequelize.STRING
    }
  });
  // Step.associate = (models) => {
  //
  // }
  return Step;
};
