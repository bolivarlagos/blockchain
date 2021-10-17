const Blockchain = require('./blockchain')
const Block = require('./block')

const coin = new Blockchain()

coin.addBlock(new Block(1, Date.now(), ['no transactions']))

console.log(coin)