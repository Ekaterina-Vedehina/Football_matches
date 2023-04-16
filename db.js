const Pool = require('pg').Pool

const pool = new Pool({
  user: "postgres",
  password: "admin123456",
  host: "localhost",
  port: 5432,
  database: "football"
})

module.exports = pool