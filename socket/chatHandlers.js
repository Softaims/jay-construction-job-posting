import { connectedUsers } from "./connectedUsers.js";
import { createAndSendMessage } from "../features/chat/controllers.js";

export const chatHandlers = (io, socket, userId) => {
  socket.on("sendMessage", async (message, callback) => {
    try {
      // const savedMessage = await createAndSendMessage({ senderId, recipientId, content, type, io, connectedUsers });
      const recipientSockets = connectedUsers.get(message.recipientId);
      console.log("recipient sockets", recipientSockets);
      if (recipientSockets && recipientSockets.size > 0) {
        recipientSockets.forEach((socketId) => {
          console.log(`emitting message to socketid ${socketId}`);
          io.to(socketId).emit("receiveMessage", message);
        });
      }
      callback({ status: "ok", message: "Message sent", data: message });
    } catch (error) {
      console.error("Error while sending message", error.message);
      callback({
        status: "error",
        message: "Failed to send message",
        error: error.message,
      });
    }
  });
};
