import { connectedUsers } from "./connectedUsers.js";
import { chatHandlers } from "./chatHandlers.js";

export const setupSocketListeners = (io) => {
  io.on("connection", (socket) => {
    const email = socket.handshake.auth.email;
    connectedUsers.set(email, socket.id);

    console.log(`✅ ${email} connected with socket ID: ${socket.id}`);

    // Attach chat event listeners
    chatHandlers(io, socket, email);

    socket.on("disconnect", () => {
      connectedUsers.delete(email);
      console.log(`❌ ${email} disconnected`);
    });
  });
};
