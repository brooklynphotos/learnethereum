pragma solidity >0.5.0;
pragma experimental ABIEncoderV2;

contract Voter {
  uint[] public votes;
  string[] public options;
  mapping(address=>bool) hasVoted;
  mapping(string=>OptionPos) posOfOption;

  struct OptionPos{
    uint pos;
    bool exists;
  }

  constructor(string[] memory _options) public {
    options = _options;
    votes.length = options.length;
    for (uint i = 0; i < options.length; i++) {
      // using memory to avoid a cost
      OptionPos memory optPos = OptionPos(i, true);
      posOfOption[options[i]] = optPos;
    }
  }

  function vote(string memory option) public {
    require(!hasVoted[msg.sender], "Account already voted");
    OptionPos memory opPos = posOfOption[option];
    require(opPos.exists, "Option does not exist");
    votes[opPos.pos] = votes[opPos.pos] + 1;
    hasVoted[msg.sender] = true;
  }

  function getOptions() public view returns (string[] memory) {
    return options;
  }

  function getVotes() public view returns (uint[] memory) {
    return votes;
  }
}