const express = require('express')
const router = express.Router()
const contract = require('../models/contract.model')

router.post('/create', async (req, res, next) => {
    for (let index = 1; index <= 6000; index++) {

        const newContract = new contract({ id_contract: index, status: true })
        await newContract.save(err => console.log(`--${index}--`, err))
    }
    const newContract = await contract.find().sort({ 'id_contract': 1 })
    // console.log(newContract)
    return res.status(200).json({
        data: { newContract },
        message: 'success'
    })
})
router.delete('/delete', async (req, res, next) => {

    const newContract = await contract.deleteMany({})
    // console.log(newContract)
    return res.status(200).json({
        data: { newContract },
        message: 'success'
    })
})

router.get('/', async (req, res, next) => {

    const newContract = await contract.find().sort({ 'id_contract': 1 })
    return res.status(200).json({
        data: { newContract },
        message: 'success'
    })
})
router.get('/group', async (req, res, next) => {

    const newContract = await contract.find().sort({ 'id_contract': -1 })
    return res.status(200).json({
        data: { newContract },
        message: 'success'
    })
})


module.exports = router