const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  users: {
    username: {
      type: String,
      required: true,
    },
  },
})

module.exports = { Rooms: mongoose.model('rooms', RoomSchema) }
