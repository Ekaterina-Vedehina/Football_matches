const Router = require('express')
const router = new Router()

const ArchController = require('../controllers/arc.controller.js')

router.post('/rasp', ArchController.addMatch)
router.get('/rasp', ArchController.getAllMatch)
router.get('/rasp', ArchController.getOneMatch)


module.exports = router