const User = require('../models/user.model')
const { userValidate } = require('../helpers/validation')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt')
const { use } = require('../routes/user.routes')
const client = require('../database/init.redis')
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
    getUserLogin: async (req, res, next) => {
        try {
            const { username } = req.body
            // console.log({ username })
            const response = await User.findOne({ username }).select('-password')
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
            const host = req.headers.host
            const filePath = req.protocol + '://' + host + '/' + req.file.path
            const { username, fullname, phone, email, role, position, note, ban } = req.body
            const file = req.file
            const userInfo = { username, password: username, full_name: fullname, phone_number: phone, email, role, position, image_path: filePath, note, ban }
            // console.log({ userInfo })
            const newUser = new User(userInfo)
            const response = await newUser.save()
            res.status(200).json({
                data: response,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    updateUser: async (req, res, next) => {
        try {

            const host = req.headers.host
            const filePath = req.protocol + '://' + host + '/' + req.file?.path

            const { id, username, fullname, phone, email, role, position, note, ban } = req.body

            const userInfo = { username, password: username, full_name: fullname, phone_number: phone, email, role, position, image_path: filePath, note, ban }
            // console.log({ userInfo })
            const updated = await User.findByIdAndUpdate({ _id: id }, userInfo)
            const dataFillter = await User.findById(updated._id)

            res.status(200).json({
                data: dataFillter,
                message: 'success'
            })
        } catch (error) {
            next(error)
        }
    },
    findUser: async (req, res, next) => {
        try {
            const { full_name, ...data } = req.body

            let dataInput = { ...data };
            if (full_name) {
                dataInput = { 'full_name': { $regex: full_name }, ...data }
            }
            if (Object.keys(dataInput).length) {
                const dataFillter = await User.find(dataInput).select('-password -_id')

                res.status(200).json({
                    data: dataFillter,
                    message: 'success'
                })
            }


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
    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.params
            // console.log('tk==>>', refreshToken)
            if (!refreshToken) throw new Error('Bad request')
            const { userId } = await verifyRefreshToken(refreshToken)
            client.del(userId.toString(), (err, reply) => {
                if (err) {
                    throw new Error('Internal Server Error')
                }
                return res.status(200).json({
                    message: 'success'
                })
            })
        } catch (error) {
            next(error)
        }
    },
    getlists: async (req, res, next) => {
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
    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw new Error('Bad request')
            const payload = await verifyRefreshToken(refreshToken)
            const { userId } = payload
            const accessToken = await signAccessToken(userId)
            const rToken = await signRefreshToken(userId)
            return res.status(200).json({
                accessToken,
                refreshToken: rToken
            })
        } catch (error) {
            next(error)
        }
    }
}