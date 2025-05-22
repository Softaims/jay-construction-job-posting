import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
  auth: {
    userId: "ahmad123",
  },
});

// Listen for messages
socket.on("receiveMessage", (message) => {
  console.log(" New message for you Ahmad:", message);
});
