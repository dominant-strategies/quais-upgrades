const { ethers, upgrades } = require("hardhat");
const { quais } = require('quais');
const BoxJSON = require("../artifacts/contracts/Box.sol/Box.json");
const BoxV2 = require("../artifacts/contracts/BoxV2.sol/Box2.json");

describe("deployProxy function", function () {
  it("deploys a Box contract and initializes it to 42", async function () {

    const provider =  new quais.JsonRpcProvider('https://rpc.orchard.quai.network', undefined, { usePathing: true })
    const signer = new quais.Wallet("0x5eec99c44ec18c4b9e7136e259b58fa4879db568ff20245011de1f77af306e72", provider)
    let nonce = await provider.getTransactionCount(signer.address)
    console.log('Nonce: ', nonce)
    let balance = await provider.getBalance(signer.address)
    console.log(await ethers.provider.getBalance(signer.address))
    console.log('Balance: ', balance / BigInt(10**18))
    // 1. Get the contract factory
    const Box = new quais.ContractFactory(BoxJSON.abi, BoxJSON.bytecode, signer);
    
    // 2. Deploy via quais deployProxy function
    const box = await upgrades.deployProxy(Box, [42]);
    console.log(box.hash)
    // 3. Wait for deployment to be mined
    await box.waitForDeployment();
    sleep(10000)
    // 4. Check that it was initialized to 42
    console.log(await box.retrieve())
    let address = await box.getAddress()
    const boxV2 = new quais.ContractFactory(BoxV2.abi, BoxV2.bytecode, signer)
    const proxyV2 = await upgrades.upgradeProxy(address, boxV2)
    await proxyV2.waitForDeployment()

    // 5. Optionally store a new value, then verify
    let tx = await box.store(100);
    await tx.wait()
    console.log((await box.retrieve()))
    console.log((await proxyV2.retrieve()))
  }).timeout(100000000);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}