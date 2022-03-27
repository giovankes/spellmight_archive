import Rooms from '../models/roomsModel'
const fetch = async () => {
  await Rooms.find()
    .lean()
    .then((rooms, e) => {
      if (e) throw e
      if (rooms) return rooms
      return
    })
}

export default fetch
