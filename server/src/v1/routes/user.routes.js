const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {

    res.send('/v1/user')
})

module.exports = router