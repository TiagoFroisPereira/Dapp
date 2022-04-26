
// 0xf86c01850c4b201000825208949cbfd6ebdb9cfcccd6b043f43e524583486d455e880490283b23ec8f768025a067da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6ca00b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842

// See the https://eth.wiki/fundamentals/rlp for full explanaition
// 0x
// f8 = f7 + length of payload in binary fom in bytes (108 = 01101100 in binary = 1 Byte) f7 + 1 = f8
// 6c = the size of payload = 108 bytes
// 01 - nonce in hex
// 85 (0x85 - 0x80 = 5 bytes)
// 0c4b201000 -gasPrice
// 82 (0x82 - 0x80 = 2 bytes)
// 5208 - gasLimit
// 94 (0x94 - 0x80 = 20bytes)
// 9cbfd6ebdb9cfcccd6b043f43e524583486d455e - to
// 88 (0x88 -0x80 = 8 bytes )
// 0490283b23ec8f76 - value
// 80 - data
// 25 - 1 byte is encoding itself - v
// a0 ( a0 - 0x80 = 32 bytes)
// 67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c - r
// a0 ( a0 - 0x80 = 32 bytes)
// 0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842 - s 

// 1 nibble = 4 bits
// 1 byte = 8 bits

const EthereumTx = require("ethereumjs-tx").Transaction

const txParams = {
  nonce: "0x01",
  gasPrice: "0x0C4B201000",
  gasLimit: "0x5208",
  to: "0x9cbfd6ebdb9cfcccd6b043f43e524583486d455e",
  value: "0x0490283B23EC8F76",
  data: "0x",
  v: "0x25",
  r: "0x67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c",
  s: "0x0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842"
}

const tx = new EthereumTx(
  txParams, {chain: "mainnet"}
)

const key = tx.getSenderPublicKey()
// keccak256(public key)
const address = tx.getSenderAddress()
const isValid = tx.verifySignature()

console.log("Public Key: ", key.toString("hex"))
console.log("Address: ", address.toString("hex"))
console.log("Is Valid: ", isValid)


// Transaction where we are signing the transaction

const txParams2 = {
    nonce: "0x01",
    gasPrice: "0x0C4B201000",
    gasLimit: "0x5208",
    to: "0x9cbfd6ebdb9cfcccd6b043f43e524583486d455e",
    value: "0x0490283B23EC8F76",
    data: "0x"
  }
  
  const tx2 = new EthereumTx(
    txParams, {chain: "mainnet"}
  )

  const privateKey = Buffer.from("96732f4cd896ca3887e2cbcf4cd6daf4790fdb1a60325f27d6f1dbbc5a75b9a1", "hex");

  tx2.sign(privateKey);


const key2 = tx2.getSenderPublicKey()
// keccak256(public key)
const address2 = tx2.getSenderAddress()
const isValid2 = tx2.verifySignature()

console.log("Public Key: ", key2.toString("hex"))
console.log("Address: ", address2.toString("hex"))
console.log("Is Valid: ", isValid2)