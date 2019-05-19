pragma solidity ^0.5.0;

library Utils {
  function etherToWeis(uint inEther) public pure returns(uint) {
    return inEther * 1 ether;
  }

  function minuteToSeconds(uint inMin) public pure returns(uint) {
    return inMin * 1 minutes;
  }

}