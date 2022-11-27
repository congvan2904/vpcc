const express = require("express")
const app = express()
const cors = require('cors')
const logEvents = require('./v1/helpers/logEvents')

require('./v1/database/init.mongoose')
require('./v1/database/init.redis')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/v1', require('./v1/routes/'))

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((err, req, res, next) => {
    const date = new Date(); // for now
    const getTime = date.toTimeString().split(' ')[0];
    const getUrl = req.url
    const getMethod = req.method
    const getError = err.message
    // console.log('err.status---', err.status)
    const message = `${getTime} ---- ${getUrl} --- ${getMethod} --- ${getError}`
    logEvents(message)
    return res.status(200).json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
    })
})

module.exports = app