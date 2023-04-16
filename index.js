const express = require('express')
const teamsRouter = require('./routes/teams.routes.js')
const raspsRouter = require('./routes/rasp.routes.js')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/api', teamsRouter)
app.use('/api', raspsRouter)
app.get ('/', (req, res) => {
  console.log(req.body);
  res.send('Сервер работает')
})
/*app.get ('/teams', (req, res) => {
  console.log(req.body);
  res.send('Список командs')
})
/*app.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json('Сервер работает343!')
  }
)*/

app.listen(PORT, () => console.log(`Server working: http://localhost:${PORT}` ))
