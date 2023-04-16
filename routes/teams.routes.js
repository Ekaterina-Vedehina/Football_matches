const Router = require('express')
const router = new Router()

const TeamsController = require('../controllers/teams.controller.js')

router.post('/teams', TeamsController.createTeam)
router.get('/teams', TeamsController.getAllTeams)
router.get('/teams/:id', TeamsController.getOneTeam)
router.put('/teams/:id', TeamsController.updateTeam)


module.exports = router