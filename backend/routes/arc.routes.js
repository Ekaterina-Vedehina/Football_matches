const Router = require('express')
const router = new Router()

const ArcController = require('../controllers/arc.controller.js')

router.post('/arc', ArcController.addMatch)
router.get('/arc', ArcController.getAllMatch)
/*router.get('/arc', ArcController.getOneMatch)*/


module.exports = router