const crypto = require('crypto-js/sha256')
const EC = require('elliptic').ec 
const ec = new EC('secp256k1')

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount 
    }

    get transactionHash(){
        return crypto(
            this.fromAddress +
            this.toAddress +
            this.amount 
        ).toString()
    }

    isTransactionValid(){
        if(this.fromAddress === null) return true

        if(!this.signature || this.signature.length === 0){
            throw new Error('You must Sign the transaction')
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
        return publicKey.verify(this.transactionHash, this.signature)
        
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('Signing key doesn\'t match public key')
        }
        const txHash = this.transactionHash
        const sig = signingKey.sign(txHash, 'base64')
        this.signature = sig.toDER('hex')
    }
}

module.exports = Transaction 
