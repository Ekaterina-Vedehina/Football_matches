const Router = require('express')
const router = new Router()

const RaspController = require('../controllers/rasp.controller.js')

router.post('/rasp', RaspController.createMatch)
router.get('/rasp', RaspController.getAllRasp)
router.get('/rasp', RaspController.getOneRasp)
router.delete('/rasp', RaspController.deleteRasp)


module.exports = router