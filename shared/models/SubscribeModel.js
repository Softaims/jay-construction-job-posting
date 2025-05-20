import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

export const Subscribe = mongoose.model("Subscribe", SubscribeSchema);
