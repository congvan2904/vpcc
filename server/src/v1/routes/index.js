const express = require('express')
const router = express.Router()

router.use('/user', require('./user.routes'))
router.use('/contract', require('./contract.routes'))

module.exports = router