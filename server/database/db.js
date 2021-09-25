const mongoose = require('mongoose')
const consola = require('consola')
const { config } = require('../config')
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('connected', () => {
  consola.succes('connected!')
})

db.on('error', (error) => {
  consola.warn(`error: ${error}`)
})

db.on('disconnected', () => {
  consola.warn('disconnected')
})

export default mongoose
