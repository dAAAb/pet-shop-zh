var HDWalletProvider = require("truffle-hdwallet-provider"); 

// infura 注册后获取的api-key
var infura_apikey = "6ecbb277c11843cdbbad22b4d37f89ff";

// 你的以太坊钱包地址 進入 MetaMask -> Settings -> reveal seed words 复制到这里
var mnemonic = "knife disease boat aunt annual festival element tribe anxiety enable orbit ritual"; 

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    private: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 3012388,
      gasPrice: 30000000000
    },
    main: {
      provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/"+infura_apikey),
      network_id: 1,
      gas: 3012388,
      gasPrice: 5100000000
    }
  }
};