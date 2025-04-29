import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
  auth: {
    userId: "ali123",
  },
});
console.log("starting");
setTimeout(() => {
  socket.emit(
    "sendMessage",
    {
      senderId: "ali123",
      recipientId: "ahmad123",
      type: "text",
      content: "Hello Ahmad! It's Ali",
    },
    (response) => {
      console.log("message status", response);
    }
  );
}, 5000);
