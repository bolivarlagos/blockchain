require('dotenv').config()
const EC = require('elliptic').ec 
const ec = new EC('secp256k1')

const key = ec.keyFromPrivate(process.env.private_key)
const wallet = key.getPublic('hex')

module.exports = { key, wallet }


