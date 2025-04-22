import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
    auth: {
      email: "ahmad@gmail.com",
    },
  });



// Listen for messages
socket.on("receiveMessage", (message) => {
  console.log("📥 New message for John:", message);
});