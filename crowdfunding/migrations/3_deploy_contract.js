const CrowdFundingWithDeadline = artifacts.require("./CrowdFundingWithDeadline.sol");

module.exports = function(deployer){
  deployer.deploy(
    CrowdFundingWithDeadline,
    "Test Campaigne",
    1,
    200,
    "0xa2B7834369c002d1f765C8990Bac61888B24a741"
  )
}