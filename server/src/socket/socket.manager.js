let io;
let connectedUsers = [];

function setIo(ioInstance) {
  io = ioInstance;
}

function getIo() {
  return io;
}

function getOnlineUsers() {
  return connectedUsers;
}

function addUser(userId, socketId) {
  if (!connectedUsers.some((user) => user.userId === userId)) {
    connectedUsers.push({
      userId,
      socketId,
    });
  }

  io.emit('get-users', connectedUsers);
}

function removeUser(socketId) {
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
  io.emit('get-users', connectedUsers);
}

export { setIo, getIo, getOnlineUsers, addUser, removeUser };
