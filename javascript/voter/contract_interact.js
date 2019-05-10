const fs = require('fs');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"), null, {});

const contractAddress = "0xEEE7E8F1Ed0D3c31c923BedE1e5404Ad1D37F632";
const fromAddress = "0x9B4Fd512F53A0b577EBfEa849C699B8592C22304";

const abiStr = fs.readFileSync('abi.json', 'utf8');
const abi = JSON.parse(abiStr);

const voter = new web3.eth.Contract(abi, contractAddress);

sendTransaction()
  .then(()=>{
    console.log("Done")
  })
  .catch((error)=>{
    console.log(error)
  })

async function sendTransaction(){
  console.log("Adding option 'coffee'");
  await voter.methods.addOption('coffee').send({from: fromAddress});
  console.log("Adding option 'tea'");
  await voter.methods.addOption('tea').send({from: fromAddress});

  await voter.methods.startVoting().send({from: fromAddress, gas: 600000});

  console.log("Voting");
  await voter.methods['vote(uint256)'](0).send({from: fromAddress, gas: 600000});

  console.log("Getting votes");
  const votes = await voter.methods.getVotes().call({from: fromAddress});

  console.log(`Votes: ${votes}`)
}