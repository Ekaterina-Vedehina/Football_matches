const express = require('express')
const teamsRouter = require('./routes/teams.routes.js')
const raspsRouter = require('./routes/rasp.routes.js')
const arcsRouter = require('./routes/arc.routes.js')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

let corsOptions = {
  origin : ['http://localhost:8080'],
} 
app.use(cors(corsOptions))
app.use('/api', teamsRouter)
app.use('/api', raspsRouter)
app.use('/api', arcsRouter)
app.get ('/', (req, res) => {
  console.log(req.body);
  res.send('Сервер работает. Ура!')
})

app.listen(PORT, () => console.log(`Server working: http://localhost:${PORT}` ))
