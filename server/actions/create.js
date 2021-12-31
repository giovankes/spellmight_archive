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
    store = io.sockets.adapter.rooms.get(user_id)
    store.clients = [
      {
        id: socket.id,
        username,
        isReady: false,
      },
    ]

    console.log(store)
    socket.username = username
    consola.info(`created ${user_id}`)
    socket.emit('room created', {
      connected_clients: store.clients,
      roomId: user_id,
      options: options,
      username: username,
    })
  }
}

export default create
