import { addUserSocket, removeUserSocket } from "./connectedUsers.js";
import { chatHandlers } from "./chatHandlers.js";

export const setupSocketListeners = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    addUserSocket(userId, socket.id);
    console.log(`✅ UserId ${userId} connected with socket ID: ${socket.id}`);

    chatHandlers(io, socket, userId);

    socket.on("disconnect", () => {
      removeUserSocket(userId, socket.id);
      console.log(`❌ UserId ${userId} disconnected`);
    });
  });
};
