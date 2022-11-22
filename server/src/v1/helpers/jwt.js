const JWT = require('jsonwebtoken')
const client = require('../database/init.redis')
const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '20s'
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
                throw new Error(err.message)
            }
            req.payload = payload
            next()
        })
    } catch (error) {
        next(error)
    }
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: '1h'
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            client.set(userId.toString(), token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    })
}

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(err.message)
            client.get(payload.userId, (err, reply) => {
                if (err) return reject(err)
                if (refreshToken === reply) return resolve(payload)
                return reject(new Error('Unauthorized'))
            })
        })
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}