const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.post('/register', userController.register)
router.get('/', userController.getUser)
router.post('/create', userController.createUser)



module.exports = router