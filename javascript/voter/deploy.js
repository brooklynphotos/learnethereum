const fs = require("fs");
const solc = require("solc");
const Web3 = require("web3");

const contract = compileContract();
const web3 = createWeb3();
const sender = '0x36ccf357090dfdfcd4669aa15b6754102d1fadb8'

deployContract(web3, contract, sender)
  .then(()=>{
    console.log("Contract deployed")
  })
  .catch((err)=>{
    console.log("Failed to deploy"+err)
  })

function compileContract() {
  const compilerInput = {
    language: 'Solidity',
    sources:{
      'Voter.sol':{
        content: fs.readFileSync('Voter.sol', 'utf8')
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
  console.log("Compiling the contract");
  // 1 means optimize it
  const compiledContract = JSON.parse(solc.compile(JSON.stringify(compilerInput)));

  const contract = compiledContract.contracts['Voter.sol']['Voter'];

  // save ABI for later use
  const abi = contract.abi;
  fs.writeFileSync('abi.json',abi);

  return contract;
}

function createWeb3() {
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"), null, {});
  return web3;
}

async function deployContract(web3, contract, sender) {
  const Voter = new web3.eth.Contract(contract.abi);
  const bytecode = '0x'+contract.evm.bytecode.object;
  const gasEstimate = await web3.eth.estimateGas({data: bytecode});
  console.log('Deploying contract');
  const contractInstance = await Voter.deploy({
    data: bytecode
  })
  .send({
    from: sender,
    gas: gasEstimate,
  })
  .on('transactionHash', (th)=>{
    console.log(`Transaction Hash: ${th}`);
  })
  .on('confirmation', (cn, receipt)=>{
    console.log(`Confirmation number: ${cn}`)
  });

  console.log(`Contract address: ${contractInstance.options.address}`);
}