import { insert } from '../queries'
const create = async ({
  socket,
  store,
  user_id,
  io,
  username,
  clients,
  options,
}) => {
  if (clients.size <= 0) {
    await socket.join(user_id)
    console.log(user_id)
    store = io.sockets.adapter.rooms.get(user_id)
    store.clients = [
      {
        id: socket.id,
        username,
        isReady: false,
      },
    ]

    socket.username = username
    socket.emit('room created', {
      connected_clients: store.clients,
      roomId: user_id,
      options: options,
      username: username,
    })

    insert({
      room: user_id,
      users: store.clients,
      options: options,
      username: username,
    })
  }
}

export default create
