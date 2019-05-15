const CrowdFundingWithDeadline = artifacts.require('./CrowdFundingWithDeadline.sol');

const BigNumber = require('./bignumber.js')

contract('CrowdFundingWithDeadline', (accounts)=>{
  const ONE_ETH = new BigNumber(1000000000000000000);
  const creator = accounts[0];
  const beneficiary = accounts[1];
  const OnGoing = 0;
  const Failed = 1;
  const Succeeded = 2;
  const PaidOut = 3;


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

    // get the public field
    const targetAmount = await contract.targetAmount.call();
    expect(ONE_ETH.isEqualTo(targetAmount)).to.equal(true);

    // beneficiary
    const actualBeneficiary = await contract.beneficiary.call();
    expect(actualBeneficiary).to.equal(beneficiary);

    // state
    const currentState = await contract.state.call();
    expect(currentState.valueOf().toNumber()).to.equal(OnGoing);
  })
})