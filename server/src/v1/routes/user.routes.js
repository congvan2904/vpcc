const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
router.get('/', (req, res, next) => {

    res.send('/v1/user')
})

router.post('/create', async (req, res, next) => {
    // console.log('Name::::', req.body.name)
    const newUser = new user({ name: req.body.name })
    const kq = await newUser.save()
    res.status(200).json({
        kq,
        message: 'success'
    })
})


module.exports = router