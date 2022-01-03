import server from 'express'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import Room from './roomManager'
import consola from 'consola'
import config from './config'
const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})
let players = []

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
  players.push(socket.id)
})

const verifySocket = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const decoded = verifyToken(socket.handshake.query.token)
    socket.decoded = decoded
    next()
  }
}

httpServer.listen(8081, function () {
  consola.success('Server started!')
})
