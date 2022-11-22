const User = require('../models/user.model')
const { userValidate } = require('../helpers/validation')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt')
const { use } = require('../routes/user.routes')
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
            const user = await User.findOne({ username })
            if (!user) {
                throw new Error(`User name ${username} not Exist`)
            }
            const isValid = await user.isCheckPassword(password)
            if (!isValid) {
                req.status = 401
                throw new Error(`Unauthorized`)
            }
            const accessToken = await signAccessToken(user._id)
            const refreshToken = await signRefreshToken(user._id)
            return res.status(200).json({
                accessToken,
                refreshToken
            })
        } catch (error) {
            next(error)
        }
    },
    getlists: async (req, res, next) => {
        try {
            const { userId } = req.payload
            return res.status(200).json({
                userId
            })
        } catch (error) {
            next(error)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw new Error('Bad request')
            const payload = await verifyRefreshToken(refreshToken)
            const { userId } = payload
            const acessToken = await signAccessToken(userId)
            const rToken = await signRefreshToken(userId)
            return res.status(200).json({
                acessToken,
                refreshToken: rToken
            })
        } catch (error) {
            next(error)
        }
    }
}