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

            if (error) {
                throw new Error(error.details[0].message)
            }

            const isExits = await User.findOne({ username })
            if (isExits) {
                throw new Error(`${username} is ready registered`)
            }
            const user = new User(req.body)
            const saveUser = await user.save()
            return res.status(200).json({
                data: saveUser,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const { error } = await userValidate(req.body)
            if (error) {
                throw new Error(error.details[0].message)
            }
            const { username, password } = req.body
            const isExist = await User.findOne({ username })
            if (!isExist) {
                throw new Error(`User name ${username} not Exist`)
            }
            const isValid = await isExist.isCheckPassword(password)
            if (!isValid) {
                req.status = 403
                throw new Error(`Unauthorized`)
            }
            return res.status(200).json({
                data: isExist,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    }
}