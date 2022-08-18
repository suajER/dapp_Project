var AccountVerification= artifacts.require("./AccountVerification.sol");

module.exports = function(deployer) {
  deployer.deploy(AccountVerification);
};
