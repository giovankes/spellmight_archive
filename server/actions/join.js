const pluck = (rooms) => {
  return Object.keys(rooms)
}

const join = ({ socket }) => {
  const rooms = socket.rooms
  console.log(rooms)
}

export default join
