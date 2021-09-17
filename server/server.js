const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})

let players = []
const consola = require('consola')
io.on('connection', function (socket) {
  consola.info('A user connected: ' + socket.id)
  players.push(socket.id)

  if (players.length === 1) {
    io.emit('isPlayerA')
  }
  socket.on('disconnect', function () {
    consola.info('A user disconnected: ' + socket.id)
  })
})

http.listen(8081, function () {
  consola.success('Server started!')
})
