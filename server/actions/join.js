const pluck = (rooms) => {
  return Object.keys(rooms)
}

const join = ({ io }) => {
  const rooms = io.sockets.adapter.rooms
  const plucked_rooms = pluck(rooms)
  console.log(plucked_rooms)
}

export default join
