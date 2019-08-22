const express = require('express')
const router  =express.Router()

const positionController = require('../controllers/position')
const userController =  require('../controllers/users')

router.get('/list',userController.isSignin,positionController.render)


module.exports = router