import { saveMessage } from "./services.js";
import { updateConversationLastMessage } from "./services.js";

export const createAndSendMessage = async ({ senderId, recipientId, content, type, io, connectedUsers }) => {
  const [user1, user2] = [senderId.toString(), recipientId.toString()].sort();
  const conversationId = `${first}_${second}`;

  const savedMessage = await saveMessage(conversationId, senderId, content, type);

  await updateConversationLastMessage(user1, user2, savedMessage._id);

  return savedMessage;
};
