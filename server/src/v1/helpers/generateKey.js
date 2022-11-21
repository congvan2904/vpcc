const crybto = require('crypto')

const key1 = crybto.randomBytes(32).toString('hex')
const key2 = crybto.randomBytes(32).toString('hex')
console.table({ key1, key2 })