const express = require('express')
const router = express.Router()
const contractController = require('../controllers/contract.controller')
const { verifyAccessToken } = require('../helpers/jwt')
const { authPage } = require('../helpers/permissionAuth')

//create multi contract
router.post('/create-contracts', verifyAccessToken, authPage(['VT', 'role1']), contractController.createContracts)

//create one contract
router.post('/create-contract', verifyAccessToken, authPage(['VT', 'role1']), contractController.createContract)

//create one contract Today
router.post('/create-contract-today', verifyAccessToken, authPage(['VT', 'role1']), contractController.createContractToday)
router.patch('/update-contract-today', verifyAccessToken, authPage(['VT', 'role1']), contractController.updateContractToday)
router.delete('/delete-contract-today/:id', verifyAccessToken, authPage(['VT', 'role1']), contractController.deleteContractToday)



router.post('/updates', contractController.updateContracts)

router.delete('/deletes', verifyAccessToken, authPage(['VT', 'role1']), contractController.deleteContracts)

// get page
router.get('/', verifyAccessToken, authPage(['VT', 'role1']), contractController.getPageContract)

// get all Debt Contract
router.get('/debt', verifyAccessToken, authPage(['VT', 'role1']), contractController.getDebtContract)
router.get('/group-debt', verifyAccessToken, authPage(['VT', 'role1']), contractController.getGroupDebtContract)
router.patch('/update-status-debt', verifyAccessToken, authPage(['VT', 'role1']), contractController.updateStatusDebtContract)


// TEST POPULATE
router.get('/populate', verifyAccessToken, authPage(['VT', 'role1']), contractController.populateContract)

router.get('/group', verifyAccessToken, authPage(['VT', 'role1']), contractController.groupContract)

router.post('/find', verifyAccessToken, authPage(['VT', 'role1']), contractController.findContract)
router.post('/find-debt', verifyAccessToken, authPage(['VT', 'role1']), contractController.findContractDebt)

router.get('/group-sort', verifyAccessToken, authPage(['VT', 'role1']), contractController.getContractsSort)

router.get('/today', verifyAccessToken, authPage(['VT', 'role1']), contractController.getContractsToday)
router.get('/last-contract', verifyAccessToken, authPage(['VT', 'role1']), contractController.getLastContract)



module.exports = router