const groupBy = require('../helpers/groupDataByKey')
const reverseObj = require('../helpers/reverseObjectKey')
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
            const { idAuto, dropdownSecretary, dropdownNotary, nameContract, phone, dateAuto, nameCustomer } = req.body
            const date = new Date()
            const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

            const dataIn = {
                id_contract: +idAuto,
                id_user_secretary: dropdownSecretary, // inputs.dropdownSecretary,
                id_user_notary: dropdownNotary, // inputs.dropdownNotary,
                name: nameContract,
                phone: phone,
                date_create: dateAuto || today,
                note: nameCustomer,
            };

            const newContract = new contract(dataIn)
            const response = await newContract.save()
            const getUserName = await user.findById(dropdownSecretary)
            const dataGroup = { ...(response.toObject()), username: getUserName.username }
            return res.status(200).json({
                data: dataGroup,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    createContractToday: async (req, res, next) => {
        try {
            const { idAuto, dropdownSecretary, dropdownNotary, nameContract, phone, dateAuto, nameCustomer } = req.body
            const date = new Date()
            const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

            const dataIn = {
                id_contract: +idAuto,
                id_user_secretary: dropdownSecretary, // inputs.dropdownSecretary,
                id_user_notary: dropdownNotary, // inputs.dropdownNotary,
                name: nameContract,
                phone: phone,
                date_create: dateAuto,
                note: nameCustomer,
            };

            const newContract = new contract(dataIn)
            const response = await newContract.save()
            const dataFillter = await contract.findById(response._id).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
            // console.log({ dataFillter })
            return res.status(200).json({
                data: dataFillter,
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
                data: newContract,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    getPageContract: async (req, res, next) => {
        try {
            const PAGE_SIZE = +req.query.page_size || 50
            const page = +req.query.page


            if (page) {

                const skip = (+page - 1) * PAGE_SIZE
                const newContract = await contract.find({})
                    .populate("id_user_secretary", "username -_id")
                    .populate("id_user_notary", "username -_id")
                    .sort({ 'id_contract': 1 }).skip(skip).limit(PAGE_SIZE)

                const newarr = newContract.map((item) => ({
                    item,
                    sohop: Math.ceil(item.id_contract / 50)
                }))

                return res.status(200).json({
                    data: newarr,
                    message: 'success'
                })
            }
            const newContract = await contract.find({})
                .populate("id_user_secretary", "username -_id")
                .populate("id_user_notary", "username -_id")
                .sort({ 'id_contract': 1 })
            const newarr = newContract.map(item => ({
                item,
                sohop: Math.ceil(item.id_contract / 50)
            }))
            return res.status(200).json({
                data: newarr,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    getPageDebtContract: async (req, res, next) => {
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
                    data: newarr,
                    message: 'success'
                })
            }
            const newContract = await contract.find({ status: true }).sort({ 'id_contract': 1 })
            const newarr = newContract.map(item => ({
                item,
                sohop: Math.ceil(item.id_contract / 50)
            }))
            return res.status(200).json({
                data: newarr,
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
                    $sort: { id_user_secretary: 1 }
                },
                { $limit: 30 },
                {
                    $group: {
                        _id: '$id_user_secretary',
                        id_contract: {
                            $addToSet: {
                                "$cond": {
                                    "if": {
                                        "$eq": [
                                            "$status",
                                            true
                                        ]
                                    },
                                    "then": ['$_id', '$id_contract', '$date_create'], //If true returns 1
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
                        username: '$user.username',
                        id_contract: 1,
                        count: 1
                    }
                }

            ])
            const sUserName = data.sort((a, b) => a.username.localeCompare(b.username))

            const newData = sUserName.map((item) => {
                return ({ ...item, id_contract: item.id_contract.sort((a, b) => b[1] - a[1]) })

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
    //update status contract
    findContract: async (req, res, next) => {
        try {
            const filter = req.body;
            // const update = req.body.status === 'true' ? true : false
            // console.log(`${filter} -- ${update}`)
            const { id_contract, name, note, phone, dateFrom: startDate, dateTo: endDate, id_user_notary, id_user_secretary } = { ...filter }
            if (startDate && endDate) {
                if (id_contract) {
                    const response = await contract.find({ id_contract: +id_contract, "date_create": { "$gte": (new Date(startDate)).setHours(0, 0, 0, 0), "$lt": (new Date(endDate).setHours(23, 59, 59, 999)) } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                if (id_user_notary) {
                    const response = await contract.find({ id_user_notary: id_user_notary, "date_create": { "$gte": (new Date(startDate)).setHours(0, 0, 0, 0), "$lt": (new Date(endDate).setHours(23, 59, 59, 999)) } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                if (id_user_secretary) {
                    const response = await contract.find({ id_user_secretary: id_user_secretary, "date_create": { "$gte": (new Date(startDate)).setHours(0, 0, 0, 0), "$lt": (new Date(endDate).setHours(23, 59, 59, 999)) } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                if (name) {
                    const response = await contract.find({ $text: { $search: name }, "date_create": { "$gte": (new Date(startDate)).setHours(0, 0, 0, 0), "$lt": (new Date(endDate).setHours(23, 59, 59, 999)) } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                if (note) {
                    const response = await contract.find({ 'note': { $regex: note }, "date_create": { "$gte": (new Date(startDate)).setHours(0, 0, 0, 0), "$lt": (new Date(endDate).setHours(23, 59, 59, 999)) } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao noteeee', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                if (phone) {
                    // console.log({ phone })
                    const response = await contract.find({ 'phone': { $regex: phone }, "date_create": { "$gte": (new Date(startDate)).setHours(0, 0, 0, 0), "$lt": (new Date(endDate).setHours(23, 59, 59, 999)) } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao phone', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                const response = await contract.find({ "date_create": { "$gte": (new Date(startDate)).setHours(0, 0, 0, 0), "$lt": (new Date(endDate).setHours(23, 59, 59, 999)) } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (id_contract) {
                const response = await contract.find({ id_contract: +id_contract }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (id_user_notary) {
                const response = await contract.find({ id_user_notary: id_user_notary }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (id_user_secretary) {
                const response = await contract.find({ id_user_secretary: id_user_secretary }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (name) {
                const response = await contract.find({ $text: { $search: name } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (note) {
                const response = await contract.find({ 'note': { $regex: note } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao noteeee', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (phone) {
                console.log({ phone })
                const response = await contract.find({ 'phone': { $regex: phone } }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                console.log('vao phone', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            // console.log('0000000000000 vao')
            // const response = await contract.find(filter)
            // return res.status(200).json({
            //     data: response,
            //     message: 'success'
            // })
        } catch (error) {
            next(error)
        }
    },
    findContractDebt: async (req, res, next) => {
        try {
            const filter = req.body;
            // const update = req.body.status === 'true' ? true : false
            // console.log(`${filter} -- ${update}`)
            const { id_contract, start, end, id_user_secretary, id_user_notary } = { ...filter }
            if (start && end) {
                const startDate = new Date(start)
                startDate.setHours(0, 0, 0, 0)
                const endtDate = new Date(end)
                endtDate.setHours(23, 59, 59, 999)
                if (id_contract) {
                    const response = await contract.find({ id_contract: +id_contract, "date_create": { "$gte": startDate, "$lt": endtDate }, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                if (id_user_secretary && id_user_notary) {
                    const response = await contract.find({ id_user_secretary: id_user_secretary, id_user_notary: id_user_notary, "date_create": { "$gte": startDate, "$lt": endtDate }, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                if (id_user_notary) {
                    const response = await contract.find({ id_user_notary: id_user_notary, "date_create": { "$gte": startDate, "$lt": endtDate }, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }
                if (id_user_secretary) {
                    const response = await contract.find({ id_user_secretary: id_user_secretary, "date_create": { "$gte": startDate, "$lt": endtDate }, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                    // console.log('vao', response)

                    return res.status(200).json({
                        data: response,
                        message: 'success'
                    })
                }


                const response = await contract.find({ "date_create": { "$gte": startDate, "$lt": endtDate }, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (id_user_secretary && id_user_notary) {
                const response = await contract.find({ id_user_secretary: id_user_secretary, id_user_notary: id_user_notary, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (id_contract) {
                const response = await contract.find({ id_contract: +id_contract, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (id_user_notary) {
                const response = await contract.find({ id_user_notary: id_user_notary, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }
            if (id_user_secretary) {
                const response = await contract.find({ id_user_secretary: id_user_secretary, status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
                // console.log('vao', response)

                return res.status(200).json({
                    data: response,
                    message: 'success'
                })
            }

        } catch (error) {
            next(error)
        }
    },
    // SORT Date - Name User - Id Contract
    getContractsSort: async (req, res, next) => {
        try {

            const dataFillter = await contract.find({ status: true }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
            // const newData = dataFillter.sort((a, b) => {
            //     let compareDate = new Date(b.date_create) - new Date(a.date_create);
            //     let compareNameUser = a.id_user_secretary.username - b.id_user_secretary.username;
            //     let compareIdContract = b.id_contract - a.id_contract;
            //     console.log(a.id_user_secretary.username)
            //     return compareDate || compareNameUser || compareIdContract
            // })

            const grouped = groupBy(dataFillter, 'date_create');
            // const arrGroup = [...grouped]
            // const newData = reverseObj(grouped)
            // const newData2 = Object.keys(grouped).reverse();
            // const sortObject = o => Object.keys(o).reverse().reduce((r, k) => (r[k] = o[k], r), {})
            // const newData3 = sortObject(grouped)
            const data = await contract.aggregate([
                {
                    $sort: { date_create: -1 }
                },
                // { $limit: 100 },
                {
                    $group: {
                        _id: '$id_user_secretary',
                        id_contract: {
                            $addToSet: {
                                "$cond": {
                                    "if": {
                                        "$eq": [
                                            "$status",
                                            true
                                        ]
                                    },
                                    "then": ['$_id', '$id_contract', '$date_create'], //If true returns 1
                                    "else": '$$REMOVE' // else 0
                                }
                            }
                        },
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

                        name: '$user.username'
                        ,
                        id_contract: 1
                    }
                }

            ])
            return res.status(200).json({
                data: data,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    getContractsToday: async (req, res, next) => {
        const start = new Date()
        start.setHours(0, 0, 0, 0)
        const end = new Date()
        end.setHours(23, 59, 59, 999)
        // const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        try {
            // console.log(' Date.now  ---', new Date())
            const dataFillter = await contract.find({
                date_create: {
                    $gte: start,
                    $lte: end
                }
            }).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
            // console.log({ dataFillter })
            return res.status(200).json({
                data: dataFillter,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    getLastContract: async (req, res, next) => {

        try {
            const dataFillter = await contract.findOne({}, {}, { sort: { 'createdAt': -1 } })
            // console.log({ dataFillter })
            return res.status(200).json({
                data: dataFillter,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    updateContractToday: async (req, res, next) => {
        try {
            const { id, idAuto, dropdownSecretary, dropdownNotary, nameContract, phone, dateAuto, nameCustomer } = req.body


            const dataIn = {
                id_contract: +idAuto,
                id_user_secretary: dropdownSecretary,
                id_user_notary: dropdownNotary,
                name: nameContract,
                phone: phone,
                date_create: dateAuto,
                note: nameCustomer,
            };
            const updated = await contract.findByIdAndUpdate({ _id: id }, dataIn)
            const dataFillter = await contract.findById(updated._id).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
            return res.status(200).json({
                data: dataFillter,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    deleteContractToday: async (req, res, next) => {
        try {
            const { id } = req.params

            // console.log(id)

            const deleteId = await contract.findOneAndDelete({ _id: id })
            // console.log({ deleteId })
            // const dataFillter = await contract.findById(updated._id).populate('id_user_secretary', ['username']).populate('id_user_notary', ['username'])
            return res.status(200).json({
                data: deleteId,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    getGroupDebtContract: async (req, res, next) => {
        try {

            const data = await contract.aggregate([
                {
                    $match: { status: true }
                },

                {
                    $group: {
                        _id: { id_user_secretary: "$id_user_secretary", date_create: "$date_create" },
                        count: { $sum: 1 },
                        list_contract: { $push: { id_contract: "$_id", number_contract: "$id_contract", name_contract: "$name" } }
                    }
                },
                {
                    $group: {
                        _id: "$_id.id_user_secretary",
                        list_day: {
                            $push: {
                                date_create: "$_id.date_create",
                                count: "$count",
                                list_contract: "$list_contract"
                            }
                        }
                    }
                },
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
                        username: '$user.username',
                        list_day: {
                            $sortArray:
                            {
                                input: "$list_day",
                                sortBy: { date_create: -1 },

                            },

                        },

                    }
                }, {
                    $sort: { username: 1 }
                },

            ])


            return res.status(200).json({
                data,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    //update status contract
    updateStatusDebtContract: async (req, res, next) => {
        try {
            const filter = req.body.id
            const update = req.body.status === 'true' ? true : false
            const date = new Date()
            const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

            // console.log(`${filter} -- ${update}`)
            const response = await contract.findOneAndUpdate({ _id: filter }, { status: update, day_finish: new Date(today) })
            return res.status(200).json({
                data: response,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
}
