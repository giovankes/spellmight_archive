import consola from 'consola'

import Rooms from '../models/roomsModel'

const insert = async ({ room, users, options, username }) => {
  await Rooms.find({ roomId: room })
    .lean()
    .then((data) => {
      if (data.length > 0) {
        return consola.error(`room ${room} already exists in the database`)
      } else {
        const newRoom = new Rooms({
          roomId: room,
          roomname: username,
          users: users,
          options: options,
        })
        newRoom.save().then(() => {
          consola.success(`saved room ${room} to the database`)
        })
      }
    })
}

export default insert
