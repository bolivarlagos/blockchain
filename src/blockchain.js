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
}

module.exports = Blockchain
