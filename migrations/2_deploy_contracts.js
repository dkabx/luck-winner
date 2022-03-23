const LuckyWinner  = artifacts.require("LuckyWinner");

module.exports = async function(deployer) {
  deployer.deploy(LuckyWinner);
};


