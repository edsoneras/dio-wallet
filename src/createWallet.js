const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoinjs = require('bitcoinjs-lib')

const network = bitcoinjs.networks.testnet
// derivacao de carteiras HD
const path = `m/49'/1'/0'/0` 

// criando o mnemonic para o seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raiz da carteira
let root = bip32.fromSeed(seed,network)

// criando uma conta  
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoinjs.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço:", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Mnemonic:", mnemonic)




