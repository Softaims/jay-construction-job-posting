import { connectedUsers } from "./connectedUsers.js";

export const chatHandlers = (io, socket, email) => {

  socket.on("sendMessageToUser", ({ recipientEmail, message }) => {
    const recipientSocketId = connectedUsers.get(recipientEmail);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", {
        message,
        from: email,
      });
      
      socket.emit("messageDelivered", { message });
    }
  });

  socket.on("typing", ({ recipientEmail }) => {
    const recipientSocketId = connectedUsers.get(recipientEmail);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("typing", { from: email });
    }
  });

  socket.on("stopTyping", ({ recipientEmail }) => {
    const recipientSocketId = connectedUsers.get(recipientEmail);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("stopTyping", { from: email });
    }
  });

};
