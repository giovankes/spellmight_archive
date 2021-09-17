const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})
const Room = require('./roomManager.js')
let players = []
const consola = require('consola')
io.on('connection', async (socket) => {
  const { username, userId, password, action, options } = socket.handshake.query

  const room = new Room({
    io,
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
})

http.listen(8081, function () {
  consola.success('Server started!')
})
