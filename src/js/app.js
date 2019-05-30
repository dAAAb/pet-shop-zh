App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('.atvImg-layer').attr('data-img', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        //petTemplate.find('.atvImg-rendered-layer').attr('style', style='background-image: url("'+data[i].picture+'");');

        petsRow.append(petTemplate.html());
      }
      atvImg();
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      //MetaMask alert
      alert('咦？無法連結您的虛擬貨幣錢包。建議使用 Google Chrome 安裝 MetaMask 外掛後再回來！點選「確認」進行離鏈遊玩。', null, null);
      $('.container').find('.github-link').attr('class', 'github-link active');
      App.web3Provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/');
      //App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;    
      return adoptionInstance.getAdopters.call();
    }).then(function(params) {
//      alert(params);
      var adopters = params[0];
      var prices = params[1];

      for (i = 0; i < adopters.length; i++) { 
        $('.panel-pet').eq(i).find('.pet-price').text(prices[i] / (1000000000000000000) );     
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('.pet-owner').text(adopters[i].substring(0,15) + '...');
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });  
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    
    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }    
      var account = accounts[0];
    
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
        App.contracts.Adoption.deployed().then(function(instance) {
          adoptionInstance = instance;    
          return adoptionInstance.getAdopters.call();
        }).then(function(params) {
          

          var adopters = params[0];
          var prices = params[1];

          // Execute adopt as a transaction by sending account
          return adoptionInstance.adopt(petId, 
            {
              from: account,
              value: prices[petId],
              gasPrice: 1000000000 * 5
            }
          );     

        }).catch(function(err) {
          console.log(err.message);
        });  
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
