const db = require ('../db')

class TeamsController {
  async createTeam(req, res) {
    const {id, tname} = req.body
    const newTeam = await db.query("INSERT INTO teams (id, tname) values ($1, $2) RETURNING *", [id, tname])
    res.json(newTeam.rows[0])
  }
  async getAllTeams (req, res) {
    const teams = await db.query('SELECT * FROM teams;')
    res.json(teams.rows)
  }
  async getOneTeam (req, res) {
    const id = req.params.id
    const team = await db.query('SELECT * FROM teams WHERE id = $1', [id])
    res.json(team.rows[0])
  }
  async updateTeam (req, res) {
      const id = req.params.id
      const { tname } = req.body
      const team = await db.query('UPDATE teams SET tname = $1 WHERE id = $2 RETURNING *', [tname , id])
      res.json(team.rows[0])
    
  }
}

module.exports = new TeamsController()