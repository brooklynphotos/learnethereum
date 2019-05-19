const Utils = artifacts.require('./Utils.sol');
const CrowdFundingWithDeadline = artifacts.require('./CrowdFundingWithDeadline.sol');
const TestCrowdFundingWithDeadline = artifacts.require('./TestCrowdFundingWithDeadline.sol');

module.exports = async (deployer)=>{
  await deployer.deploy(Utils);
  // link the real contract and the test contract
  deployer.link(Utils, CrowdFundingWithDeadline);
  deployer.link(Utils, TestCrowdFundingWithDeadline);

}