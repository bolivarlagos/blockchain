const crypto = require('crypto-js/sha256')

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount 
    }

    transactionHash(){
        return crypto(
            this.fromAddress +
            this.toAddress +
            this.amount 
        ).toString()
    }
}

module.exports = Transaction 
