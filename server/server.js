const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http)
const consola = require('consola')
io.on('connection', function (socket) {
  console.log('A user connected: ' + socket.id)

  socket.on('disconnect', function () {
    consola.success('A user disconnected: ' + socket.id)
  })
})

http.listen(8081, function () {
  consola.success('Server started!')
})
