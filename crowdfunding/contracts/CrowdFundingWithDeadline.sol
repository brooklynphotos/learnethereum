pragma solidity ^0.5.0;

contract CrowdFundingWithDeadline {
  enum State {OnGoing, Failed, Succeeded, PaidOut}

  string public name;
  uint public targetAmount;
  uint public fundingDeadline;
  address public beneficiary;
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
    address beneficiaryAddress
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
    amounts[msg.sender] += msg.value;
    totalCollected += msg.value;

    if(totalCollected>=targetAmount){
      collected = true;
    }
  }
}