const Blockchain = require('./blockchain')
const Block = require('./block')

const coin = new Blockchain()

coin.minePendingTransactions('my-address')
console.log(coin)
console.log(coin.balanceOf('my-address'))
