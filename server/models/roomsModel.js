import mongoose from 'mongoose'
const Schema = mongoose.Schema
const RoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  roomname: {
    type: String,
  },
  users: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
})
const Rooms = mongoose.model('rooms', RoomSchema)
export default Rooms
