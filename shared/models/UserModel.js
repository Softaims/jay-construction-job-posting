import mongoose from "mongoose";

const options = { discriminatorKey: "role", timestamps: true };

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    description: { type: String },
    profile_picture: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["main_contractor", "subcontractor", "job_seeker", "admin"],
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiry: {
      type: Date,
    },
  },
  options
);

export const User = mongoose.model("User", UserSchema);
