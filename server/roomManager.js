import { create, join, fetch_rooms } from './actions'
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
    console.log(this.action)
    const clients = await this.io.in(this.roomId).allSockets()
    if (!clients) {
      consola.error('[INTERNAL ERROR] Room creation failed!')
    }

    consola.debug(`Connected clients are: ${clients}`)

    if (this.action === 'join') {
      join({ socket: this.socket, io: this.io })
    }

    if (this.action === 'create') {
      if (clients.size === 0) {
        create({
          socket: this.socket,
          user_id: this.userId,
          io: this.io,
          username: username,
          clients: clients,
          options: this.options,
        })
        return true
      } else {
        consola.ware('already exists')
        this.socket.emit('error')
        return false
      }
    }
    if (this.action === 'fetch_rooms') {
      fetch_rooms({
        socket: this.socket,
        io: this.io,
      })
    }
  }
}

export default Room
