const express = require('express')
const router  =express.Router()

const positionController = require('../controllers/position')
const authMiddleware =  require('../middleware/auth')
const fileupMiddleware = require('../middleware/fileupload')
router.get('/list',authMiddleware.auth,positionController.list)
router.post('/save',authMiddleware.auth,fileupMiddleware,positionController.save)
router.post('/findone',authMiddleware.auth,positionController.findone)
router.patch('/patch',authMiddleware.auth,fileupMiddleware,positionController.patch)
router.delete('/delete',authMiddleware.auth,positionController.delete)
router.post('/search',authMiddleware.auth,positionController.search)


module.exports = router