import { connectedUsers } from "./connectedUsers.js";
import { createAndSendMessage } from "../features/chat/controllers.js";
import { messageValidator } from "../features/chat/validators/messageValidator.js";
import { getUserByEmail, getUserById } from "../shared/services/services.js";
import { sendMail } from "../utils/email.utils.js";

export const chatHandlers = (io, socket) => {
  socket.on("sendMessage", async (message, callback) => {
    try {
      const result = messageValidator(message);
      if (!result.success) {
        return callback({
          status: "error",
          message: "Validation failed",
          error: result.error,
        });
      }

      const senderId = socket.user._id;
      const data = await createAndSendMessage({ senderId, ...message });
      const recipientSockets = connectedUsers.get(message.recipientId);

      // If recipient has active sockets, send message through socket
      if (recipientSockets && recipientSockets.size > 0) {
        recipientSockets.forEach((socketId) => {
          io.to(socketId).emit("receiveMessage", data);
        });
        callback({ status: "ok", message: "Message sent", data: data });
      } else {
        callback({ status: "ok", message: "Message sent", data: data });
        try {
          // Get sender's info for the email
          const sender = await getUserByEmail(socket.user.email);
          const recipientId = data.conversation.participants.find((id) => id != socket.user.email);
          const recipient = await getUserById(recipientId);
          if (recipient) {
            const messageContent = message.type === "text" ? message.content : `New enquiry about job: ${message.enquiry.title}`;

            await sendMail(recipient.email, "New Message Received", null, {
              senderName: sender.full_name || sender.company_name || sender.email,
              messageContent: messageContent,
            });
          }
        } catch (emailError) {
          console.error("Error sending email notification:", emailError);
          // Don't fail the message sending if email fails
        }
      }
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
