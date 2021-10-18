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

    insertIntoPending(tx){
        this.pendingTransactions.push(tx)
    }

    allTransaction(addr){
        let txs = []

        for(let block of this.chain){
            for(let tx of block.transactions){
                if(tx.fromAddress === addr || tx.toAddress === addr){
                    txs.push(tx)
                }
            }
        }
        return txs 
    }

    addTransaction(tx){
        if(this.balanceOf(tx.fromAddress) < tx.amount){
            throw new Error('Not enough balance')
        }
        if(tx.amount <= 0){
            throw new Error('Transaction amount must be higher than 0')
        }
        if(!tx.fromAddress || !tx.toAddress){
            throw new Error('Transactions must include Sender and Receiver')
        }
        if(!tx.isTransactionValid()){
            throw new Error('Cannot add invalid transaction')
        }
        this.insertIntoPending(tx)
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
        this.insertIntoPending(new_tx)

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
    }

    isChainValid(){
        for(let i = 1; i < this.chainSize; i++){
            let currentBlock = this.chain[i]
            let previousBlock = this.chain[i - 1]

            if(!currentBlock.hasValidTransactions()) return false 

            if(currentBlock.hash !== currentBlock.calcHash) return false 

            if(currentBlock.previousHash !== previousBlock.hash) return false 
        }
        return true
    }
}

module.exports = Blockchain
