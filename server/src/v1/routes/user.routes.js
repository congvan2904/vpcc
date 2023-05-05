const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { verifyAccessToken } = require('../helpers/jwt')
const { authPage } = require('../helpers/permissionAuth')
const upload = require('../models/multer.model')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.delete('/logout', verifyAccessToken, authPage(['VT', 'role1']), userController.logout)
router.post('/refresh-token', userController.refreshToken)
router.get('/getlists', verifyAccessToken, authPage(['VT', 'role1']), userController.getlists)
router.get('/', authPage(['VT', 'role1']), userController.getUser)
router.post('/create', verifyAccessToken, authPage(['VT', 'role1']), upload.single('image'), userController.createUser)
// router.post('/create', upload.single('image'), userController.createUser)
// router.get('/users', userController.getUser)





module.exports = router