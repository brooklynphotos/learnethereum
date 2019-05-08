pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract MultiSigWallet{
  uint minApprovers; // minimum number of approvers needed

  address payable beneficiary;
  address payable owner;

  mapping(address=>bool) approvedBy;
  mapping(address=>bool) isApprover;
  uint approverCount;

  constructor(
    address[] memory _approvers,
    uint _minApprovers,
    address payable _beneficiary
  )public payable{ // this is for payments
    require(_minApprovers <= _approvers.length, "Required number of approvers cannot exceed approver count");
    minApprovers = _minApprovers;
    beneficiary = _beneficiary;
    owner = msg.sender;
    for (uint i = 0; i < _approvers.length; i++) {
      isApprover[_approvers[i]] = true;
    }
  }

  /**
   * allows someone to approve this request
   */
  function approve() public {
    require(isApprover[msg.sender], "You are not an approver");
    require(!approvedBy[msg.sender], "You already approved");
    approvedBy[msg.sender] = true;
    approverCount++;

    if(approverCount==minApprovers){
      beneficiary.transfer(address(this).balance);
      selfdestruct(owner);
    }
  }

  function reject() public {
    require(isApprover[msg.sender], "You are not an approver");
    selfdestruct(owner);
  }
}