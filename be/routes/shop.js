const express = require('express')
const router  =express.Router()

const shopController = require('../controllers/shop')

router.get('/list',shopController.list)
router.post('/save',shopController.save)
router.post('/findone',shopController.findone)
router.put('/put',shopController.put)
router.delete('/delete',shopController.delete)
router.post('/search',shopController.search)


module.exports = router