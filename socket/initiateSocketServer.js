import { Server } from "socket.io";
import { setupSocketListeners } from "./socketManager.js";

export let io;
export const initiateSocketServer = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
      credentials: true,
    },

    
  });

  setupSocketListeners(io);
};


