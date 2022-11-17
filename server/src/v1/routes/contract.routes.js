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

    const newContract = await contract.updateMany({}, { id_user: req.body.user })
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
            .populate("id_user", "name -_id")
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

        const dataFillter = await contract.find({ status: false }).count()
        console.log({ dataFillter })

        const data = await contract.aggregate([

            {
                $group: {
                    _id: '$id_user',
                    count: {
                        "$sum": {
                            "$cond": {
                                "if": {
                                    "$eq": [
                                        "$status",
                                        false
                                    ]
                                },
                                "then": 1, //If false returns 1
                                "else": 0 // else 0
                            }
                        }
                    }
                }

            }
        ])
        const arr = []
        const newData = data.map(async (item) => {
            const idUser = await user.findById(item._id)
            // console.log(idUser)
            return ({ ...item, idUser })

        })
        newData.map(item => console.log(item))
        const response = await contract.find({ status: true })
        return res.status(200).json({
            data,
            message: 'success'
        })
    } catch (error) {
        console.log('/debt--', error)
    }
})

// TEST PUPULATE
router.get('/populate', async (req, res, next) => {
    try {

        const data = await user.aggregate([

            {
                $lookup:
                {
                    from: 'contract',
                    localField: '_id',
                    foreignField: 'id_user',
                    as: 'user'
                }
            }
            // {
            //     $unwind: '$user'
            // },
            // {
            //     $project: {
            //         user: {
            //             name: '$user.name',
            //         }
            //     }
            // }
        ])


        return res.status(200).json({
            data,
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
        const update = req.body.status === 'true' ? true : false
        // console.log(`${filter} -- ${update}`)
        const response = await contract.findOneAndUpdate({ id_contract: +filter }, { status: update })
        return res.status(200).json({
            data: { response },
            message: 'success'
        })
    } catch (error) {
        console.log('user/find---', error)
    }
})

module.exports = router