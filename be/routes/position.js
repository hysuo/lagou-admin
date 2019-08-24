const express = require('express')
const router  =express.Router()

const positionController = require('../controllers/position')
const authMiddleware =  require('../middleware/auth')

router.get('/list',authMiddleware.auth,positionController.list)
router.post('/save',authMiddleware.auth,positionController.save)
router.post('/findone',authMiddleware.auth,positionController.findone)
router.put('/put',authMiddleware.auth,positionController.put)
router.delete('/delete',authMiddleware.auth,positionController.delete)


module.exports = router