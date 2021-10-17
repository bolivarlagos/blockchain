const Block = require('./block')

class Blockchain{
    constructor(){
        this.chain = [Block.genesis]
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

    addBlock(new_block){        
        new_block.previousHash = this.latestBlock.hash 
        new_block.hash = new_block.calcHash
        this.chain.push(new_block)
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
