const Block = require('./block')
const Transaction = require('./transaction')

class Blockchain{
    constructor(){
        this.chain = [Block.genesis]  
        this.pendingTransactions = []
        this.dificulty = 2    
        this.miningReward = 100
    }

    get(){
        return this.chain 
    }
    get chainSize(){
        return this.chain.length 
    }
    get latestBlock(){
        return this.chain[this.chainSize - 1]
    }

    get miningPattern(){
        return '0'.repeat(this.dificulty)
    }

    clearTransactions(){
        this.pendingTransactions = []        
    }

    insert(tx){
        this.pendingTransactions.push(tx)
    }

    addTransaction(transaction){
        this.insert(transaction)
    }

    balanceOf(address){
        let balance = 0

        for(let block of this.chain){
            for(let tx of block.transactions){
                if(tx.fromAddress === address){
                    balance -= tx.amount
                }
                if(tx.toAddress === address){
                    balance += tx.amount
                }
            }
        }
        return balance 
    }

    minePendingTransactions(address){
        let new_tx = new Transaction(null, address, this.miningReward)
        this.insert(new_tx)

        let new_block = new Block(this.chainSize, Date.now(), this.pendingTransactions)
        new_block.previousHash = this.latestBlock.hash
        this.proofOfWork(new_block)
        this.chain.push(new_block)

        this.clearTransactions()
    }

    proofOfWork(blk){
        while(blk.hash.slice(0, this.dificulty) !== this.miningPattern){
            blk.nonce++
            blk.hash = blk.calcHash
        }
        console.log('Block successfully mined ', blk.hash)
    }

    isChainValid(){
        for(let i = 1; i < this.chainSize; i++){
            let currentBlock = this.chain[i]
            let previousBlock = this.chain[i - 1]

            if(currentBlock.hash !== currentBlock.calcHash) return false 

            if(currentBlock.previousHash !== previousBlock.hash) return false 
        }
        return true
    }
}

module.exports = Blockchain
