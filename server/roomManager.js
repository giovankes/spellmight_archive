const { Server, Socket } = require('socket.io')
const { Adapter } = require('socket.io-adapter')
//NOTE: cum manager
class Room {
  constructor(options) {
    this.io = options.io
    this.socket = options.socket
    this.userId = options.userId
    this.store = options.io.adapter
    this.username = options.username
    this.action = options.action
    this.options = {
      max_players: 2,
      maxTimeLimit: 0,
    }
  }

  async init(username) {
    const clients = await this.io.in(this.roomId).allSockets()
    console.log(clients)
    if (!clients) {
      consola.error('[INTERNAL ERROR] Room creation failed!')
    }
    consola.debug(`Connected clients are: ${clients}`)

    if (this.action === 'join') {
      console.log('lmao!')
    }

    if (this.action === 'create') {
      if (clients.size === 0) {
        await this.socket.join(this.userId)
        this.store = this.io.sockets.adapter.rooms.get(this.userId)
        this.store.clients = [{ id: this.socket.id, username, isReady: false }]
        this.socket.username = username
        consola.info(`created ${this.userId}`)
        this.socket.emit('room created', {
          connected_clients: this.store.clients,
          roomId: this.userId,
          options: this.options,
          username: this.username,
        })

        return true
      }
      consola.warn('already exists')
      this.socket.emit('error')
      return false
    }
  }
}

module.exports = Room
