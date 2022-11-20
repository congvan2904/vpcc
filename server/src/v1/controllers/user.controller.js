const User = require('../models/user.model')
const { userValidate } = require('../helpers/validation')
module.exports = {
    getUser: async (req, res, next) => {
        try {
            const response = await User.find()
            return res.status(200).json({
                data: response,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    createUser: async (req, res, next) => {
        try {

            const newUser = new User({ name: req.body.name })
            const kq = await newUser.save()
            res.status(200).json({
                data: kq,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    register: async (req, res, next) => {
        try {
            const { username, password } = req.body
            const { error } = userValidate(req.body)
            // console.log(error)
            if (error) {
                throw new Error(error.details[0].message)
            }
            const isCreate = await User.create(req.body)
            res.status(200).json({
                data: isCreate,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    }
}