const users = require('../models/user.model')
const findUser = async (userId) => {
    try {
        const result = await users.find({ _id: userId })
        return result
    } catch (error) {
        throw new Error(error.message)
    }

}
const authPage = permission => {
    return async (req, res, next) => {
        const { userId } = req.payload
        if (!userId) {
            return res.status(403).json('You need sign in')
        }
        try {
            const user = await findUser(userId)
            if (!user) {
                return res.status(403).json('User not found')

            }
            const { role } = user[0]
            if (!permission.includes(role)) {
                throw new Error("You don't have permission")
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    authPage
}