const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
  },
  users: {
    username: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
})

module.exports = { Rooms: mongoose.model('rooms', RoomSchema) }
