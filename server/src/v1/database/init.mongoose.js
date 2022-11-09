const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://cong:1234@van-thu.rvpx6py.mongodb.net/vpcc')
    .then(() => console.log('mongoose connect success'))
    .catch((err) => console.log('mongoose connect fail', err))

module.exports = mongoose