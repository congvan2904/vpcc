const express = require("express")
const app = express()
const logEvents = require('./v1/helpers/logEvents')

require('./v1/database/init.mongoose')

app.use(express.json())

app.use('/v1', require('./v1/routes/'))

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((err, req, res, next) => {
    logEvents(err.message)
    return res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
    })
})

module.exports = app