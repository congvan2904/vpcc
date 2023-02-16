const express = require('express')
const router = express.Router()
const contractController = require('../controllers/contract.controller')
const { verifyAccessToken } = require('../helpers/jwt')
const { authPage } = require('../helpers/permissionAuth')


router.post('/create', contractController.createContracts)

//create one contract
router.post('/create-contract', verifyAccessToken, authPage(['VT', 'role1']), contractController.createContract)

router.post('/updates', contractController.updateContracts)

router.delete('/deletes', verifyAccessToken, authPage(['VT', 'role1']), contractController.deleteContracts)

// get page
router.get('/', verifyAccessToken, authPage(['VT', 'role1']), contractController.getPageContract)

// get all Debt Contract
router.get('/debt', verifyAccessToken, authPage(['VT', 'role1']), contractController.getDebtContract)

// TEST POPULATE
router.get('/populate', verifyAccessToken, authPage(['VT', 'role1']), contractController.populateContract)

router.get('/group', verifyAccessToken, authPage(['VT', 'role1']), contractController.groupContract)

router.patch('/find', verifyAccessToken, authPage(['VT', 'role1']), contractController.findContract)

module.exports = router