import mongoose from "mongoose";

const BlacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // TTL index activates here
  },
});

export const BlacklistedToken = mongoose.model("BlacklistedToken", BlacklistedTokenSchema);
