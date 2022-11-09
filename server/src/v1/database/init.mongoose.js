const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('mongoose connect success'))
    .catch((err) => console.log('mongoose connect fail', err))

module.exports = mongoose