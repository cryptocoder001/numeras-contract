
require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    ganache: {
      url: "http://127.0.0.1:7545"
    },
    fantomtestnet: {
      url: "https://rpc.testnet.fantom.network",
      accounts: [process.env.PRIVATEKEY1]
    },
    ethereum: {
      url: "https://main-light.eth.linkpool.io/",
      accounts: [process.env.PRIVATEKEY1, process.env.PRIVATEKEY1]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [process.env.PRIVATEKEY1]
    },
    bsc: {
      url: "https://bsc-dataseed1.ninicoin.io/",
      accounts: [process.env.PRIVATEKEY1, process.env.PRIVATEKEY1]
    },
    matic: {
      url: "https://rpc-mainnet.matic.quiknode.pro",
      accounts: [process.env.PRIVATEKEY1, process.env.PRIVATEKEY1]
    },
    fantom: {
      url: "https://rpc.ftm.tools/",
      accounts: [process.env.PRIVATEKEY1, process.env.PRIVATEKEY1]
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATEKEY1, process.env.PRIVATEKEY1]
    },
    avalanche_test: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATEKEY1, process.env.PRIVATEKEY1]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "BMSG5WIEJ53VNQUS7U5ZPH7QHKHVN9JE2I"
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        }
      },
    ]
  },
  mocha: {
    timeout: 200000
  }
};
