import mongoose from "mongoose";
const { Schema } = mongoose;
const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: String,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "enquiry", "file"],
      default: "text",
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
