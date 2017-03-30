var Web3 = require("web3");
var contract = require("truffle-contract");
var $ = require("jquery");
var metacoin_artifacts = require("../build/contracts/MetaCoin.json");

var MetaCoin = contract(metacoin_artifacts);
var accounts;
var account;

window.addEventListener('load', function() {
  App.initProvider();

  var meta;
  MetaCoin.deployed().then(function(instance) {
    meta = instance;
    var transfers = meta.Transfer({fromBlock: "latest"});
    transfers.watch(function(error, result){
        if(error != null){
            console.warn(error);
        }
        else{
            console.log(result.args);
            $('#event').text("from: "+result.args._from+"\nto: "+result.args._to+"\nvalue: "+ result.args._value);
        }
    });
  });
});

window.App = {
    initProvider: function() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            console.warn("Using web3 detected from external source.");
            window.web3 = new Web3(web3.currentProvider);

            web3.eth.getAccounts(function(err, accs) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }

                if (accs.length == 0) {
                    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                    return;
                }

                accounts = accs;
                account = accounts[0];
                console.log("accounts: " +accounts);
                console.log("coinbase: " +web3.eth.coinbase);
            });

            MetaCoin.setProvider(web3.currentProvider);

        } else {
            console.warn("No web3 detected install and create an ethereum wallet on Metamask first.");
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://sogetianr.westeurope.cloudapp.azure.com:8545"));

            web3.eth.getAccounts(function(err, accs) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }

                if (accs.length == 0) {
                    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                    return;
                }

                accounts = accs;
                account = accounts[0];
                console.log("accounts: " +accounts);
                console.log("coinbase: " +web3.eth.coinbase);
            });

            MetaCoin.setProvider(web3.currentProvider);
        }
    },

    getBalance: function(adresse) {
        var meta;
        MetaCoin.deployed().then(function(instance) {
            meta = instance;
            return meta.getBalance.call(adresse, {from: account});
        }).then(function(value) {
            $('#response').text(value);
            console.log(value);
        }).catch(function(e) {
            console.log(e);
        });
    },

    sendCoin: function(adresse, amount) {
        var meta;
        MetaCoin.deployed().then(function(instance) {
            meta = instance;
            return meta.sendCoin.sendTransaction(adresse, amount, {from: account});
        }).then(function(value) {
            $('#response').text(value);
            console.log(value);
        }).catch(function(e) {
            console.log(e);
        });
    }
};

