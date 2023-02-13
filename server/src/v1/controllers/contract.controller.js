const contract = require('../models/contract.model')
const user = require('../models/user.model')

module.exports = {
    createContracts: async (req, res, next) => {
        try {
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
        } catch (error) {
            next(error)
        }
    },
    createContract: async (req, res, next) => {
        try {
            // for (let index = 1; index <= 6000; index++) {

            const newContract = new contract({ id_contract: index, status: true })
            await newContract.save(err => console.log(`--${index}--`, err))
            // }
            // const newContract = await contract.find().sort({ 'id_contract': 1 })
            // console.log(newContract)
            return res.status(200).json({
                data: { newContract },
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    updateContracts: async (req, res, next) => {
        try {
            const newContract = await contract.updateMany({}, { id_user: req.body.user })
            return res.status(200).json({
                data: { newContract },
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    deleteContracts: async (req, res, next) => {
        try {
            const newContract = await contract.deleteMany({})
            // console.log(newContract)
            return res.status(200).json({
                data: { newContract },
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    getPageContract: async (req, res, next) => {
        try {
            const PAGE_SIZE = 50
            const page = req.query.page
            // console.log(a)
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
        } catch (error) {
            next(error)
        }
    },
    getDebtContract: async (req, res, next) => {
        try {
            const numberSecretary = await user.count()
            const users = await user.find()
            users.map(async (item) => {
                const response = await contract.find({ user: item._id, status: true }).count()
                // console.log(`${response} `)
            })

            const dataFillter = await contract.find({ status: false }).count()
            // console.log({ dataFillter })

            const data = await contract.aggregate([
                {
                    $sort: { id_contract: -1 }
                },
                { $limit: 10 },
                {
                    $group: {
                        _id: '$id_user',
                        id_contract: {
                            $addToSet: {
                                "$cond": {
                                    "if": {
                                        "$eq": [
                                            "$status",
                                            true
                                        ]
                                    },
                                    "then": '$id_contract', //If true returns 1
                                    "else": '$$REMOVE' // else 0
                                }
                            }
                        },
                        count: {
                            "$sum": {
                                "$cond": {
                                    "if": {
                                        "$eq": [
                                            "$status",
                                            true
                                        ]
                                    },
                                    "then": 1, //If true returns 1
                                    "else": 0 // else 0
                                }
                            }
                        }
                    }

                }
                ,
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $project: {
                        user: {
                            name: '$user.name'
                        },
                        id_contract: 1,
                        count: 1
                    }
                }

            ])

            const newData = data.map((item) => {

                return ({ ...item, id_contract: item.id_contract.sort((a, b) => b - a) })

            })
            // newData.map(item => console.log(item))

            return res.status(200).json({
                data: newData,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    populateContract: async (req, res, next) => {
        try {
            const numberSecretary = await user.count()
            const users = await user.find()
            users.map(async (item) => {
                const response = await contract.find({ user: item._id, status: true }).count()
                // console.log(`${response} `)
            })

            const dataFillter = await contract.find({ status: false }).count()
            // console.log({ dataFillter })

            const data = await contract.aggregate([

                {
                    $group: {
                        _id: '$id_user',
                        id_contract: {
                            $push: {
                                "$cond": {
                                    "if": {
                                        "$eq": [
                                            "$status",
                                            true
                                        ]
                                    },
                                    "then": '$id_contract', //If true returns 1
                                    "else": '$$REMOVE' // else 0
                                }
                            }
                        },
                        count: {
                            "$sum": {
                                "$cond": {
                                    "if": {
                                        "$eq": [
                                            "$status",
                                            true
                                        ]
                                    },
                                    "then": 1, //If true returns 1
                                    "else": 0 // else 0
                                }
                            }
                        }
                    }

                }
                ,
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $project: {
                        user: {
                            name: '$user.name'
                        },
                        id_contract: 1,
                        count: 1
                    }
                }

            ])

            const newData = data.map((item) => {

                return ({ ...item, id_contract: item.id_contract.sort((a, b) => b - a) })

            })
            // newData.map(item => console.log(item))

            return res.status(200).json({
                data: newData,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    groupContract: async (req, res, next) => {
        try {
            const newContract = await contract.find().sort({ 'id_contract': -1 })
            return res.status(200).json({
                data: { newContract },
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    findContract: async (req, res, next) => {
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
            next(error)
        }
    }
}