/*require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports = { pool }
*/

const Pool = require('pg').Pool
var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'teepme',
  password: '1q2w3e',
  port: 5432,
})

module.exports = pool;
