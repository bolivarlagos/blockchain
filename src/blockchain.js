const Block = require('./block')

class Blockchain{
    constructor(){
        this.chain = [Block.genesis]  
        this.dificulty = 2    
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

    proofOfWork(blk){
        while(blk.hash.slice(0, this.dificulty) !== this.miningPattern){
            blk.nonce++
            blk.hash = blk.calcHash
        }
        console.log('Block successfully mined ', blk.hash)
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
