import { getIo, getOnlineUsers } from './socket.manager.js';

export const sendMessageWithSocket = (message, receiver) => {
  const io = getIo();
  const connectedUsers = getOnlineUsers();

  const userSocket = connectedUsers.find((user) => user.userId === receiver.toString());
  if (userSocket) {
    const { socketId } = userSocket;
    io.to(socketId).emit('receive-message', message);
  }
};

export const sendConversationWithSocket = (conversation, receiver) => {
  const io = getIo();
  const connectedUsers = getOnlineUsers();

  const userSocket = connectedUsers.find((user) => user.userId === receiver.toString());
  if (userSocket) {
    const { socketId } = userSocket;
    io.to(socketId).emit('receive-conversation', conversation);
  }
};
