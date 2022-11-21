const JWT = require('jsonwebtoken')

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '1h'
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            req.status = 401
            return next('Unauthorized')
        }
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                req.status = 401
                return next('Unauthorized')
            }
            req.payload = payload
            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signAccessToken,
    verifyAccessToken
}