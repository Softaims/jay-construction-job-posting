import { connectedUsers } from "./connectedUsers.js";
import { createAndSendMessage } from "../features/chat/controllers.js";
import { messageValidator } from "../features/chat/validators/messageValidator.js";
import mongoose from "mongoose";
export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (message, callback) => {
    try {
      if (!message.type) {
        return callback({
          status: "error",
          message: "Validation failed",
          error: "message type is required",
        });
      }
      if (!["text", "enquiry"].includes(message.type)) {
        return callback({
          status: "error",
          message: "Validation failed",
          error: `Invalid message type. Allowed types are 'text' or 'enquiry'`,
        });
      }
      if (!mongoose.Types.ObjectId.isValid(message.recipientId)) {
        return callback({
          status: "error",
          message: "Validation failed",
          error: `Invalid recipient Id`,
        });
      }

      const result = messageValidator(message);
      if (!result.success) {
        return callback({
          status: "error",
          message: "Validation failed",
          error: result.error.errors[0].message,
        });
      }

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
