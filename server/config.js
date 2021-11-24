const dotenv = require('dotenv')
const consola = require('consola')
dotenv.config()
const config = {
  DB_URL: process.env.DB_URL,
}

module.exports = config
