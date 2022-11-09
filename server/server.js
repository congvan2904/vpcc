require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => console.log(`Server run port ${PORT}`))

process.on('SIGINT', () => {
    server.close(() => console.log('Exits sever express'))
})