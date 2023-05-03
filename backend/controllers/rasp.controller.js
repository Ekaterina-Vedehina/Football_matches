const db = require ('../db')

class RaspController {
  async createMatch(req, res) {
    const {match_date, first_team, second_team} = req.body
    const newTeam = await db.query("INSERT INTO rasp (match_date, first_team, second_team) values ($1, $2, $3) RETURNING *", [match_date, first_team, second_team])
    res.json(newTeam.rows[0])
  }
  async getAllRasp (req, res) {
    const rasps = await db.query('SELECT * FROM rasp;')
    res.json(rasps.rows)
  }
  /*async getOneRasp (req, res) {
    const id = req.query.id
    const rasp = await db.query('SELECT * FROM rasp WHERE id = $1', [id])
    res.json(rasp.rows[0])
  }*/
  async deleteRasp (req, res) {
    const id = req.query.id
    const rasp = await db.query('DELETE FROM rasp WHERE id = $1', [id])
    res.json(rasp.rows[0])
  }
}
module.exports = new RaspController()