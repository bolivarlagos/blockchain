const Blockchain = require('./blockchain')
const Block = require('./block')
const Transaction = require('./transaction')
const { key, wallet } = require('./keys')

const coin = new Blockchain()
coin.minePendingTransactions(wallet)

const tx1 = new Transaction(wallet, 'address-1', 50)
tx1.signTransaction(key)
coin.addTransaction(tx1)
coin.minePendingTransactions(wallet)
console.log(coin.isChainValid())
console.log(coin.balanceOf(wallet))




