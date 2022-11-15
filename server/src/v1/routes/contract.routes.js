const express = require('express')
const router = express.Router()
const contract = require('../models/contract.model')
const user = require('../models/user.model')

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

router.post('/updates', async (req, res, next) => {

    const newContract = await contract.updateMany({}, { 'user': req.body.user })
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

// router.get('/', async (req, res, next) => {

//     const newContract = await contract.find().limit(1000).sort({ 'id_contract': 1 })
//     const newarr = newContract.map(item => ({
//         item,
//         sohop: Math.ceil(item.id_contract / 50)
//     }))
//     return res.status(200).json({
//         data: { newarr },
//         message: 'success'
//     })
// })

// get page
router.get('/', async (req, res, next) => {
    const PAGE_SIZE = 50
    const page = req.query.page

    if (page) {
        const skip = (+page - 1) * PAGE_SIZE
        const newContract = await contract.find({ status: true })
            .populate("user", "name -_id")
            .sort({ 'id_contract': 1 }).skip(skip).limit(PAGE_SIZE)


        const newarr = newContract.map(item => ({
            item,
            sohop: Math.ceil(item.id_contract / 50)
        }))
        return res.status(200).json({
            data: { newarr },
            message: 'success'
        })
    }
    const newContract = await contract.find({ status: true }).sort({ 'id_contract': 1 })
    const newarr = newContract.map(item => ({
        item,
        sohop: Math.ceil(item.id_contract / 50)
    }))
    return res.status(200).json({
        data: { newarr },
        message: 'success'
    })
})

// get all Debt Contract
router.get('/debt', async (req, res, next) => {
    try {
        const numberSecretary = await user.count()
        const users = await user.find()
        users.map(async (item) => {
            const response = await contract.find({ user: item._id, status: true }).count()
            // console.log(`${response} `)
        })
        const data = await contract.aggregate([
            {
                $group: {
                    _id: '$user',
                    count: { $sum: 1 }
                }
            }
        ])
        console.log(data)
        const response = await contract.find({ status: true })
        return res.status(200).json({
            // data: { response },
            message: 'success'
        })
    } catch (error) {
        console.log('/debt--', error)
    }
})

router.get('/group', async (req, res, next) => {

    const newContract = await contract.find().sort({ 'id_contract': -1 })
    return res.status(200).json({
        data: { newContract },
        message: 'success'
    })
})

router.patch('/find', async (req, res, next) => {
    try {
        const filter = req.body.name
        const update = req.body.status
        console.log(`${filter} -- ${update}`)
        const response = await user.findOneAndUpdate({ id_contract: +filter }, { status: update })
        return res.status(200).json({
            data: { response },
            message: 'success'
        })
    } catch (error) {
        console.log('user/find---', error)
    }
})

module.exports = router