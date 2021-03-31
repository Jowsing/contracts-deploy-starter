const HDWalletProvider = require("truffle-hdwallet-provider");
const dotenv = require('dotenv');
dotenv.config();

const config = require('./deploy/config.json');

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],

  api_keys: {
    bscscan: process.env.bscscanKey,
  },
  networks: {
    testnet: {
      provider: () => new HDWalletProvider([process.env.privateKey], config.chainURLs.testnet),
      network_id: 97,
      timeoutBlocks: 200,
      confirmations: 5,
      production: false    // Treats this network as if it was a public net. (default: false)
    },
    mainnet: {
      provider: () => new HDWalletProvider([process.env.privateKey], config.chainURLs.mainnet),
      network_id: 56,
      timeoutBlocks: 200,
      confirmations: 5,
      production: true
    }
  },
  compilers: {
    solc: {
      version: "0.6.12",
      docker: false,
      settings: {
       optimizer: {
         enabled: true,
         runs: 1
       },
      }
    },
  },
};
