const AlexToken = artifacts.require("AlexToken");

module.exports = function(deployer) {
  const initialSupply = web3.utils.toWei('1000', 'ether'); // 1000 tokens com 18 casas decimais
  deployer.deploy(AlexToken, initialSupply);
};