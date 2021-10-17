const crypto = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, transactions, previousHash){
        this.index = index 
        this.timestamp = timestamp
        this.transactions = transactions 
        this.previousHash = previousHash
        this.nonce = 0
        this.hash = this.calcHash
    }

    get calcHash(){
        return crypto(
            this.index + 
            this.timestamp +
            JSON.stringify(this.transactions) +
            this.previousHash +
            this.nonce).toString()
    }

    static get genesis(){
        return new Block(0, Date.now(), 'Genesis Block', 'Null')
    }
}

module.exports = Block 
