import { addUserSocket, removeUserSocket } from "./connectedUsers.js";
import { chatHandlers } from "./chatHandlers.js";
import { socketAuthMiddleware } from "../middlewares/socketAuthMiddleware.js";

export const setupSocketListeners = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    const userId = socket.user._id;
    addUserSocket(userId, socket.id);
    console.log(`UserId ${userId} connected with socket ID: ${socket.id}`);

    chatHandlers(io, socket);

    socket.on("disconnect", () => {
      removeUserSocket(userId, socket.id);
      console.log(`UserId ${userId} disconnected for socket ID: ${socket.id}`);
    });
  });
};
