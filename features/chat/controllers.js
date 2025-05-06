import { fetchAllConversations, fetchChatMessages, saveMessage } from "./services.js";
import { updateConversationLastMessage } from "./services.js";
import { catchAsync } from "../../utils/catchAsync.js";
import createError from "http-errors";

export const getAllConversations = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const conversations = await fetchAllConversations(_id);

  res.status(200).json({
    status: "success",
    results: conversations.length,
    data: conversations,
  });
});

export const getMessagesWithUser = catchAsync(async (req, res, next) => {
  const conversationId = req.query.conversationId;
  if (!conversationId) {
    return next(createError(400, "conversationId is required"));
  }

  const messages = await fetchChatMessages(conversationId);

  res.status(200).json({
    status: "success",
    results: messages.length,
    data: messages,
  });
});

export const createAndSendMessage = async (message) => {
  const [user1, user2] = [message.senderId.toString(), message.recipientId.toString()].sort();
  const conversationId = `${user1}_${user2}`;

  const savedMessage = await saveMessage(conversationId, message);

  const conversation = await updateConversationLastMessage(conversationId, user1, user2, savedMessage._id);

  return { message: savedMessage, conversation: conversation };
};
