const express = require('express')
const router = express.Router()
const contractController = require('../controllers/contract.controller')

router.post('/create', contractController.createContracts)

router.post('/updates', contractController.updateContracts)

router.delete('/delete', contractController.deleteContracts)

// get page
router.get('/', contractController.getPageContract)

// get all Debt Contract
router.get('/debt', contractController.getDebtContract)

// TEST PUPULATE
router.get('/populate', contractController.populateContract)

router.get('/group', contractController.groupContract)

router.patch('/find', contractController.findContract)

module.exports = router