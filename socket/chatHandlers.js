import { connectedUsers } from "./connectedUsers.js";
import { createAndSendMessage } from "../features/chat/controllers.js";

export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (message, callback) => {
    try {
      const senderId = socket.user._id;
      await createAndSendMessage({ senderId, ...message });
      const recipientSockets = connectedUsers.get(message.recipientId);
      if (recipientSockets && recipientSockets.size > 0) {
        recipientSockets.forEach((socketId) => {
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
