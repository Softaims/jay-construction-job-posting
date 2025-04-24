import { Message } from "../../shared/models/MessageModel.js";
import { Conversation } from "../../shared/models/ConversationModel.js";

export const saveMessage = async (conversationId, senderId, content, type) => {
  const newMessage = new Message({
    conversation: conversationId,
    sender: senderId,
    content,
    type,
  });

  return await newMessage.save();
};

export const updateConversationLastMessage = async (conversationId, user1, user2, second, messageId) => {
  let conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    conversation = new Conversation({
      _id: conversationId,
      participants: [user1, user2],
    });
  }

  conversation.lastMessage = messageId;
  await conversation.save();

  return conversation;
};
