pragma solidity >0.5.0;
pragma experimental ABIEncoderV2;

contract Voter {
  uint[] public votes;
  string[] public options;
  mapping(address=>bool) hasVoted;

  constructor(string[] memory _options) public {
    options = _options;
    votes.length = options.length;
  }

  function vote(uint option) public {
    require(option >= 0 && option<options.length, "Invalid option");
    require(!hasVoted[msg.sender], "Account already voted");
    votes[option] = votes[option] + 1;
    hasVoted[msg.sender] = true;
  }

  function getOptions() public view returns (string[] memory) {
    return options;
  }

  function getVotes() public view returns (uint[] memory) {
    return votes;
  }
}