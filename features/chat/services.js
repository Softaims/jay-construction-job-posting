import { Message } from "../../shared/models/MessageModel.js";
import { Conversation } from "../../shared/models/ConversationModel.js";

export const fetchAllConversations = async (_id) => {
  return await Conversation.find({
    participants: { $in: [_id] },
  })
    .populate("participants", "email role company_name full_name")
    .populate({
      path: "lastMessage",
      select: "sender type content updatedAt",
      populate: {
        path: "sender",
        select: "email role company_name full_name",
      },
    })
    .sort({ updatedAt: -1 });
};

export const fetchChatMessages = async (conversationId) => {
  return await Message.find({ conversation: conversationId }).populate("sender", "email role").sort({ createdAt: 1 });
};

export const saveMessage = async (conversationId, senderId, content, type) => {
  const newMessage = new Message({
    conversation: conversationId,
    sender: senderId,
    content,
    type,
  });

  return await newMessage.save();
};

export const updateConversationLastMessage = async (conversationId, user1, user2, messageId) => {
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
