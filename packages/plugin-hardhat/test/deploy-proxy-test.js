const { ethers, upgrades } = require("hardhat");
const { quais } = require("ethers");
const BoxJSON = require("../artifacts/contracts/Box.sol/Box.json");

describe("deployProxy function", function () {
  it("deploys a Box contract and initializes it to 42", async function () {

    const provider =  new quais.JsonRpcProvider('https://rpc.quai.network', undefined, { usePathing: true })
    const signer = new quais.Wallet("", provider)
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

    // 4. Check that it was initialized to 42
    console.log(await box.retrieve())

    // 5. Optionally store a new value, then verify
    let tx = await box.store(100);
    await tx.wait()
    console.log((await box.retrieve()))
  }).timeout(100000000);
});