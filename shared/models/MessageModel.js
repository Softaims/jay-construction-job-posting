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
      required: function () {
        return this.type === "text";
      },
    },
    enquiry: {
      title: {
        type: String,
        required: function () {
          return this.type === "enquiry";
        },
      },
      description: {
        type: String,
        required: function () {
          return this.type === "enquiry";
        },
      },
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: function () {
          return this.type === "enquiry";
        },
      },
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
