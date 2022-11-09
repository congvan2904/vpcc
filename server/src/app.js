const express = require("express")
const app = express()

app.use('/v1', require('./v1/routes/'))

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
    })
})

module.exports = app