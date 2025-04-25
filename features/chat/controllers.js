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
  const user1 = req.user._id;
  const user2 = req.query.userId;
  if (!user2) {
    return next(createError(400, "userId is required"));
  }
  const [id1, id2] = [user1.toString(), user2.toString()].sort();
  const conversationId = `${id1}_${id2}`;

  const messages = await fetchChatMessages(conversationId);

  res.status(200).json({
    status: "success",
    results: messages.length,
    data: messages,
  });
});

export const createAndSendMessage = async ({ senderId, recipientId, content, type }) => {
  const [user1, user2] = [senderId.toString(), recipientId.toString()].sort();
  const conversationId = `${user1}_${user2}`;

  const savedMessage = await saveMessage(conversationId, senderId, content, type);

  await updateConversationLastMessage(conversationId, user1, user2, savedMessage._id);

  return savedMessage;
};
