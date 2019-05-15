pragma solidity ^0.5.0;

contract CrowdFundingWithDeadline {
  enum State {OnGoing, Failed, Succeeded, PaidOut}

  string public name;
  uint public targetAmount;
  uint public fundingDeadline;
  address payable beneficiary;
  State public state;
  mapping(address => uint256) public amounts;
  bool public collected;
  uint public totalCollected;

  modifier inState(State expectedState) {
    require(state==expectedState, "Invalid state");
    _;
  }

  constructor(
    string memory contractName,
    uint targetAmountEth,
    uint durationInMin,
    address payable beneficiaryAddress
  ) public {
    name = contractName;
    targetAmount = targetAmountEth * 1 ether;
    fundingDeadline = currentTime() + (durationInMin * 1 minutes);
    beneficiary = beneficiaryAddress;
    state = State.OnGoing;
  }

  function currentTime() internal view returns(uint) {
    return now;
  }

  /**
   * by convention inbuilt modifier goes before custom modifiers
   * must be already in the OnGoing state
   * can pay
   */
  function contribute() public payable inState(State.OnGoing) {
    require(beforeDeadline(), "Too late!");
    amounts[msg.sender] += msg.value;
    totalCollected += msg.value;

    if(totalCollected>=targetAmount){
      collected = true;
    }
  }

  function beforeDeadline() public view returns(bool) {
    return currentTime() < fundingDeadline;
  }

  function finishCrowdFunding() public inState(State.OnGoing) {
    require(!beforeDeadline(), "Campaign ain't over");

    if(!collected){
      state = State.Failed;
    }else{
      state = State.Succeeded;
    }
  }

  function collect() public inState(State.Succeeded) {
    if(beneficiary.send(totalCollected)){
      state = State.PaidOut;
    }else{
      state = State.Failed;
    }
  }

  function withdraw() public inState(State.Failed) {
    require(amounts[msg.sender]>0, "Nothing was contributed");
    amounts[msg.sender] = 0;
    uint contribution = amounts[msg.sender];
    if(!msg.sender.send(contribution)){
      state = State.Failed;
    }
  }
}