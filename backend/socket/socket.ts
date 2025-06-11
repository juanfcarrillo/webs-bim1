import { Server } from 'socket.io';
import Message from '../models/Message';

const connectedUsers = new Map(); // socketId -> userId

export default (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('join', (userId: string) => {
      connectedUsers.set(socket.id, userId);
    });

    socket.on('chat message', async ({ message, senderId, receiverId, appointmentId }) => {
      const timestamp = new Date();

      const newMessage = new Message({
        appointmentId,
        sender: senderId,
        receiver: receiverId,
        message,
        timestamp
      });

      await newMessage.save();

      io.emit('chat message', {
        appointmentId,
        senderId,
        receiverId,
        message,
        timestamp
      });
    });

    socket.on('disconnect', () => {
      connectedUsers.delete(socket.id);
    });
  });
};
