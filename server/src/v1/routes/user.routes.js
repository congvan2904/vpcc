const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { verifyAccessToken } = require('../helpers/jwt')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/refresh-token', userController.refreshToken)
router.get('/getlists', verifyAccessToken, userController.getlists)
router.get('/', userController.getUser)
router.post('/create', userController.createUser)



module.exports = router