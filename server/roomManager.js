//NOTE: cum manager
class Room {
  constructor(options) {
    this.io = options.io
    this.rooms = []
    this.socket = options.socket
    this.userId = options.userId
    this.store = options.io.adapter
    this.username = options.username
    this.action = options.action
    this.room_id = ''
    this.options = {
      max_players: 2,
      maxTimeLimit: 0,
    }
  }
  async init(username) {
    const clients = await this.io.in(this.roomId).allSockets()
    if (!clients) {
      consola.error('[INTERNAL ERROR] Room creation failed!')
    }

    consola.debug(`Connected clients are: ${clients}`)

    if (this.action === 'join') {
      this.rooms = this.io.sockets.adapter.rooms
    }

    if (this.action === 'create') {
      if (clients.size === 0) {
        await this.socket.join(this.userId)
        this.store = this.io.sockets.adapter.rooms.get(this.userId)
        this.store.clients = [
          {
            id: this.socket.id,
            username,
            isReady: false,
          },
        ]

        this.socket.username = username
        consola.info(`created ${this.userId}`)
        this.socket.emit('room created', {
          connected_clients: this.store.clients,
          roomId: this.userId,
          options: this.options,
          username: this.username,
        })
        this.room_id = this.userId
      }
      consola.warn('already exists')
      this.socket.emit('error')
      return false
    }
  }

  async join_room(room) {
    console.log(room)
  }
}

export default Room
