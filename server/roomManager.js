const { Server, Socket } = require('socket.io')
const { Adapter } = require('socket.io-adapter')
//NOTE: cum manager
class Room {
  constructor(options) {
    this.io = options.io
    this.socket = options.socket
    this.roomId = options.roomId
    this.store = options.io.adapter
    this.action = options.action
  }

  async init(username) {
    const clients = await this.io.in(this.roomId).allSockets()
    if (!clients) {
      consola.error('[INTERNAL ERROR] Room creation failed!')
    }
    consola.debug(`Connected clients are: ${clients}`)

    if (this.action === 'join') {
      console.log('lmao!')
    }
    console.log(username)

    if (this.action === 'create') {
      if (clients.size === 0) {
        await this.socket.join(this.userId)
        this.store = this.store.rooms.get(this.userId)
        this.store.clients = [{ id: this.socket.id, username, isReady: false }]

        this.socket.username = username
        consola.info(`created ${this.userId}`)
      }
    }
  }
}

module.exports = Room
