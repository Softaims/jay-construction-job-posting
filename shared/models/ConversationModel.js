import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      validate: [(arr) => arr.length === 2, "Conversation must have exactly 2 participants"],
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
