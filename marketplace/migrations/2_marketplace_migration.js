const MarkerplaceMigration = artifacts.require("CourseMarketplace");

module.exports = function (deployer) {
  deployer.deploy(MarkerplaceMigration);
};