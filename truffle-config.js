const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const privateKey = process.env.MY_PRIVATE_KEY;
const nodeHttpsUrl = process.env.MY_NODE_HTTPS_URL;

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(
        privateKeys=[privateKey],
        providerOrUrl=nodeHttpsUrl
      ),
      network_id: '*',
      gas: 4500000,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.26"
    }
  }
};
