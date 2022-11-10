const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Mongoose connect success')
}).catch(err => console.log('Mongoose connect fail', err))

module.exports = mongoose