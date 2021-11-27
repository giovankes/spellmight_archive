const server = require('express')()
const mongoose = require('mongoose')
const http = require('http').createServer(server)
const config = require('./config.js')
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})
const Room = require('./roomManager.js')
let players = []
const consola = require('consola')

mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

// When successfully connected
db.on('connected', () => {
  consola.success('Mongoose connection open')
})

// If the connection throws an error
db.on('error', (error) => {
  consola.warn(`Mongoose connection error: ${error}`)
})

// When the connection is disconnected
db.on('disconnected', () => {
  consola.warn('Mongoose connection disconnected')
})
io.on('connection', async (socket) => {
  const { username, userId, password, action, options } = socket.handshake.query
  console.log(socket.handshake.query)
  console.log(socket)
  const room = new Room({
    io,
    socket,
    userId,
    password,
    action,
    options,
    username,
  })

  const joinedRoom = await room.init(username)
  consola.info('A user connected: ' + socket.id)
  if (joinedRoom) {
    console.log('hello')
  }
  players.push(socket.id)

  socket.on('disconnect', function () {
    consola.info('A user disconnected: ' + socket.id)
  })
  socket.on('room created', (data, e) => {
    if (e) throw e
    console.log(data)
  })

  socket.on('join', (data, e) => {
    if (e) throw e
    console.log(data)
  })
})

const verifySocket = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const decoded = verifyToken(socket.handshake.query.token)
    socket.decoded = decoded
    next()
  }
}

http.listen(8081, function () {
  consola.success('Server started!')
})
