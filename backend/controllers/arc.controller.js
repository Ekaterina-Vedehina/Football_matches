const db = require ('../db')

class ArcController {
  async addMatch(req, res) {
    const {match_date, first_team, res_one, second_team, res_two, penalty, winner} = req.body
    const arcMatch = await 
      db.query("INSERT INTO rasp (match_date, first_team, res_one, second_team, res_two, penalty, winner) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
      [ match_date, first_team, res_one, second_team, res_two, penalty, winner])
    res.json(arcMatch.rows[0])
  }
  async getAllMatch (req, res) {
    const matches = await db.query('SELECT * FROM rasp;')
    res.json(matches.rows)
  }
  async getOneMatch (req, res) {
    const id = req.query.id
    const match = await db.query('SELECT * FROM rasp WHERE id = $1', [id])
    res.json(match.rows[0])
  }
}
module.exports = new ArcController()