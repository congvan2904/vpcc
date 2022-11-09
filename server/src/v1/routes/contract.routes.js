const express = require('express')
const router = express.Router()
const contract = require('../models/contract.model')

router.get('/', async (req, res, next) => {
    // for (let index = 1; index <= 1000; index++) {

    //     const newContract = new contract({ id_contract: index, status: true })
    //     newContract.save(err => console.log('Them that bai', err))
    // }
    const newContract = await contract.find()
    console.log(newContract)
    return res.status(200).json({
        data: 'newContract',
        message: 'success'
    })
})

module.exports = router