const CrowdFundingWithDeadline = artifacts.require('./CrowdFundingWithDeadline.sol');

contract('CrowdFundingWithDeadline', (accounts)=>{
  const ONE_ETH = 1000000000000000000;
  const creator = accounts[0];
  const beneficiary = accounts[1];

  let contract;

  beforeEach(async ()=>{
    contract = await CrowdFundingWithDeadline.new(
      'myFunding',
      1,
      10,
      beneficiary,
      {
        from: creator,
        gas: 2000000,
      }
    )
  });

  it('contract is initialized', async ()=>{
    let campagnName = await contract.name.call();

    expect(campagnName).to.equal('myFunding');
  })
})