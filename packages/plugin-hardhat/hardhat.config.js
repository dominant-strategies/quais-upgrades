require('@nomicfoundation/hardhat-ethers');
require('./dist/index.js');
const override = {
  version: '0.8.10',
  settings: {
    optimizer: {
      enabled: true,
    },
  },
};

module.exports = {
  networks: {
    // Your custom network name ("myRpc" in this example)
    cyprus1: {
      url: "https://rpc.quai.network/cyprus1",
      chainId: 9000,
    },
    // ... add other networks if you want
  },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
      },
      {
        version: '0.8.9',
      },
      {
        version: '0.7.6',
      },
      {
        version: '0.6.12',
      },
      {
        version: '0.5.17',
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
      },
      evmVersion: 'london',
    },
    evmVersion: 'london',
    overrides: {
      'contracts/GapV1.sol': override,
      'contracts/GapV2.sol': override,
      'contracts/GapV2_Bad.sol': override,
    },
  },
};
