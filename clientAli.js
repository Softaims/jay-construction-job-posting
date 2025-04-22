import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
    auth: {
        email: "ali@gmail.com"
      },
  });


setTimeout(() => {
  socket.emit("sendMessageToUser", {
    recipientEmail: "ahmad@gmail.com",
    message: "Hello Ahmad! It's Ali",
  });
}, 10000);