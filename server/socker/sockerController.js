import { Server } from 'socket.io'
import redisAdapter from 'socket.io-redis'
import consola from 'consola'
import { config } from '../config.js'
import { fixedOrigin } from './corsFixer.js'
const { ALLOWLIST_HOSTS, REDIS_PORT, REDIS_HOST } = config

const app = (app) => {
  const io = new Server(app, {
    transports: ['websocket'], //to avoid sticky sessions when using multiple servers
    path: '/classic-mode',
    cors: fixedOrigin(allowedList),
    rememberUpgrade: true,
  })

  try {
    const adapter = redisAdapter({ host: REDIS_HOST, port: Number(REDIS_PORT) })
    io.adapter(adapter)
  } catch (error) {
    console.warn(error)
  }

  consola.info('socketio cummed')
  const classicMode = io.of('/classic-mode')
  classicMode.use(verifySocker).on('connection', async (socket) => {
    const { username, roomId, password, action, options } =
      socket.handshake.query
    const room = new Room({
      io: classicMode,
      socket,
      username,
      roomId,
      password,
      actions,
      options,
    })

    const joinedRoom = await room.init(username)
    consola.info('Client connected')

    if (joinedRoom) {
      room.showPlayers()
      room.isReady()
      room.shiftTurn()
    }

    room.onDisconnect()
  })
  return io
}

const verifySocker = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const decoded = verifyToken(socket.handshake.query.token)
    socket.decoded = decoded
    next()
  }
}

export default app
