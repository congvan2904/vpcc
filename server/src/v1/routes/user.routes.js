const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
router.get('/', async (req, res, next) => {
    try {
        const response = await user.find()
        return res.status(200).json({
            data: response,
            message: 'success'
        })
    } catch (error) {
        console.log('router get user', error)
    }
})

router.post('/create', async (req, res, next) => {
    // console.log('Name::::', req.body.name)
    const newUser = new user({ name: req.body.name })
    const kq = await newUser.save()
    res.status(200).json({
        data: kq,
        message: 'success'
    })
})



module.exports = router